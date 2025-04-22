import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { warehouseModels } from './entities';
import { CommonServices } from 'src/common/commn-service';

@Module({
  imports: [MongooseModule.forFeature(warehouseModels)],
  controllers: [WarehouseController],
  providers: [WarehouseService, CommonServices],
})
export class WarehouseModule {}
