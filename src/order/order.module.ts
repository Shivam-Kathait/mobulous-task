import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productModels } from 'src/product/entities';
import { orderModels } from './entities';
import { CommonServices } from 'src/common/commn-service';
import { adminModels } from 'src/admin/entities';

@Module({
  imports: [MongooseModule.forFeature([...orderModels, ...productModels, ...adminModels])],
  controllers: [OrderController],
  providers: [OrderService, CommonServices],
})
export class OrderModule { }
