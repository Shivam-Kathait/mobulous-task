import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto, Listing } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { FilterQuery, Model, PipelineStage, Types } from 'mongoose';
import { CommonServices } from 'src/common/commn-service';
import { Warehouse, WarehouseDocument } from 'src/warehouse/entities/warehouse.entity';
import { ProductAggregation } from './product.aggregation';

@Injectable()
export class ProductService {
  private option = { lean: true, sort: { _id: -1 } } as const;

  constructor(
    private readonly commonServices: CommonServices,
    private readonly productAggregation: ProductAggregation,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Warehouse.name) private warehouseModel: Model<WarehouseDocument>
  ) { }

  async createProduct(dto: CreateProductDto) {
    try {
      let { name, warehouse_id, description, price, quantity } = dto;
      let data = {
        name,
        warehouse_id: new Types.ObjectId(warehouse_id),
        description,
        price,
        quantity
      }
      let product = await this.productModel.create(data);
      let result = { data: product }
      return result
    } catch (error) {
      throw error
    }
  }

  async productListingAdmin(dto: Listing) {
    try {
      let { pagination, limit, search } = dto;
      let options = await this.commonServices.setOptions(pagination, limit);
      let query: FilterQuery<ProductDocument> = {};
      let count = await this.productModel.countDocuments(query);
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
        ];
      }
      let product = await this.productModel.find(query, {}, options);
      let result = { count, data: product }
      return result
    } catch (error) {
      throw error
    }
  }

  async productListingUser(dto: Listing, user) {
    try {
      let { pagination, limit, search } = dto;
      const maxDistanceMeters = 10 * 1000;
      const [longitude, latitude] = user.location.coordinates;
      let options = await this.commonServices.setOptions(pagination, limit)
      let query = [
        await this.productAggregation.warehouseNearUser(longitude, latitude, maxDistanceMeters),
        await this.productAggregation.products(),
        await this.productAggregation.unwind_products(),
        await this.productAggregation.redactProduct(search),
        await this.productAggregation.group_product_listing(),
        await this.productAggregation.facetData(options.skip, options.limit),
      ]

      let warehouse = await this.warehouseModel.aggregate(query);
      let response = {
        count: warehouse[0]?.metadata[0]?.count ?? 0,
        data: warehouse[0]?.data,
      }
      return response
    } catch (error) {
      throw error
    }
  }
}
