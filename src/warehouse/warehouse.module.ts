import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { warehouseModels } from './entities';

@Module({
  imports: [MongooseModule.forFeature(warehouseModels)],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
