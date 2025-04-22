import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto, Listing } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse, WarehouseDocument } from './entities/warehouse.entity';
import { FilterQuery, Model } from 'mongoose';
import { CommonServices } from 'src/common/commn-service';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly commonServices: CommonServices,
    @InjectModel(Warehouse.name) private warehouseModel: Model<WarehouseDocument>
  ) {

  }

  async createWarehouse(dto: CreateWarehouseDto) {
    try {
      let { name, description, latitude, longitude } = dto;
      let data = {
        name,
        description,
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)] // GeoJSON format: [lng, lat]
        },
        createdAt: new Date()
      }
      let warehouse = await this.warehouseModel.create(data);
      return { data: warehouse }
    } catch (error) {
      throw error
    }
  }

  async warehouseListing(dto: Listing) {
    try {
      let { pagination, limit, search } = dto;
      let options = await this.commonServices.setOptions(pagination, limit);
      let query: FilterQuery<WarehouseDocument> = {};
      let count = await this.warehouseModel.countDocuments(query);
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
        ];
      }
      let warehouse = await this.warehouseModel.find(query, {}, options);
      let result = { count, data: warehouse }
      return result
    } catch (error) {
      throw error
    }
  }
}
