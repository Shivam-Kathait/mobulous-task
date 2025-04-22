import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { Warehouse } from "src/warehouse/entities/warehouse.entity";

@Schema({ versionKey: false })
export class Order {
    
    @Prop({ type: Types.ObjectId, ref: Warehouse.name, required: true })
    warehouse_id: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
    product_id: Types.ObjectId

    @Prop({ type: Number, default: 0 })
    price: number;

    @Prop({ type: Number, default: 0 })
    quantity: number;

    @Prop({ type: Date })
    createdAt: Date;
}

export type OrderDocument = HydratedDocument<Order>
export const OrderSchema = SchemaFactory.createForClass(Order)