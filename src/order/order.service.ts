import { Injectable } from '@nestjs/common';
import { CreateOrderDto, Listing, UpdateStatus } from './dto/create-order.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/product/entities/product.entity';
import * as Errors from "../error-handler/error-service";
import { Order, OrderDocument } from './entities/order.entity';
import { CommonServices } from 'src/common/commn-service';
import { ApprovalStatus, OrderStatus } from 'src/common/utils';
import { Notification, NotificationDocument } from 'src/admin/entities/notification.entity';

@Injectable()
export class OrderService {
  private option = { lean: true, sort: { _id: -1 } } as const;
  private newOption = { lean: true, new: true, sort: { _id: -1 } } as const;

  constructor(
    private readonly commonServices: CommonServices,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) { }

  async create(dto: CreateOrderDto) {
    try {
      let { warehouse_id, product_id, quantity } = dto;
      let query = {
        _id: new Types.ObjectId(product_id),
        warehouse_id: new Types.ObjectId(warehouse_id)
      }
      let is_product = await this.productModel.findOne(query, {}, this.option);
      if (!is_product) throw new Errors.NoProductFound();
      if (is_product.quantity < quantity) throw new Errors.LowProductQuantity();
      let total_price = quantity * is_product.price
      let data = {
        product_id: new Types.ObjectId(product_id),
        warehouse_id: new Types.ObjectId(warehouse_id),
        quantity,
        price: total_price,
        createdAt: Date.now()
      }
      let order = await this.orderModel.create(data)
      let response = { data: order }
      return response
    } catch (error) {
      throw error
    }
  }

  async adminOrderList(dto: Listing) {
    try {
      let { pagination, limit } = dto
      let options = await this.commonServices.setOptions(pagination, limit);
      let count = await this.orderModel.countDocuments({})
      let list = await this.orderModel.find({}, {}, options)
      return { count, data: list }
    } catch (error) {
      throw error
    }
  }

  async adminOrderApproval(order_id: string, dto: UpdateStatus) {
    try {
      let { status } = dto;
      const query = { _id: new Types.ObjectId(order_id) };
      const order = await this.orderModel.findById(query);

      if (!order) throw new Errors.NoOrderFound();
      // Only process if the new status is "approved"
      if (status === OrderStatus.APPROVED) {
        const product = await this.productModel.findById(order.product_id);
        if (!product) throw new Errors.NoProductFound();

        if (product.quantity < order.quantity) {
          throw new Errors.LowProductQuantity();
        }

        // Decrease product quantity
        let updatedProduct = await this.productModel.findByIdAndUpdate(
          { _id: order.product_id },
          { $inc: { quantity: -order.quantity } },
          this.newOption
        );
        if (updatedProduct.quantity <= 5) {
          await this.notificationModel.create({
            product_id: updatedProduct._id,
            message: `${updatedProduct.name} is low on stock. Only ${updatedProduct.quantity} left.`,
          });
        }
      }

      // Update the order status
      const updatedOrder = await this.orderModel.findByIdAndUpdate(
        query,
        { status },
        { new: true },
      );

      return { data: updatedOrder };
    } catch (error) {
      throw error;
    }
  }

}
