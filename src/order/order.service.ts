import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/product/entities/product.entity';
import * as Errors from "../error-handler/error-service";

@Injectable()
export class OrderService {
  private option = { lean: true, sort: { _id: -1 } } as const;

  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) { }

  async create(dto: CreateOrderDto) {
    try {
      let { warehouse_id, product_id, quantity } = dto;
      let query = {
        _id: new Types.ObjectId(product_id),
        warehouse_id: new Types.ObjectId(warehouse_id)
      }
      let is_product = await this.productModel.findOne(query, {}, this.option);
      if(!is_product) throw new  Errors.NoProductFound();
      if(is_product.quantity < quantity) throw new  Errors.NoProductFound();
    } catch (error) {
      throw error
    }
  }

}
