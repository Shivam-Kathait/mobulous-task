import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ versionKey: false })
export class Product {
    @Prop({ type: String })
    name: string;

    @Prop({ type: Number, default: 0 })
    price: number;
}

export type ProductDocument = HydratedDocument<Product>
export const ProductSchema = SchemaFactory.createForClass(Product)
