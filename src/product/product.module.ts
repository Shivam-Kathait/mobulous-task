import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CommonServices } from 'src/common/commn-service';
import { MongooseModule } from '@nestjs/mongoose';
import { productModels } from './entities';
import { warehouseModels } from 'src/warehouse/entities';
import { ProductAggregation } from './product.aggregation';

@Module({
  imports: [MongooseModule.forFeature([...productModels, ...warehouseModels])],
  controllers: [ProductController],
  providers: [ProductService, CommonServices, ProductAggregation],
})
export class ProductModule { }
