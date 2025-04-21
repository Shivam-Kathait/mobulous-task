import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { inventoryModels } from './entities';

@Module({
  imports: [MongooseModule.forFeature(inventoryModels)],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule { }
