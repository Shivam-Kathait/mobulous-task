import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productModels } from 'src/product/entities';
import { orderModels } from './entities';

@Module({
  imports: [MongooseModule.forFeature([...orderModels, ...productModels])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
