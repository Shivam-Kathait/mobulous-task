import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { Warehouse } from "src/warehouse/entities/warehouse.entity";

@Schema({ versionKey: false })
export class Inventory {
    @Prop({ type: Types.ObjectId, ref: Warehouse.name })
    warehouse_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId,  ref: Product .name})
    product_id: Types.ObjectId;

    @Prop({ type: Number, default: 0 })
    quantity: number;

    @Prop({ type: Date })
    lastUpdated: Date;

    @Prop({ type: Date })
    createdAt: Date;
}

export type InventoryDocument = HydratedDocument<Inventory>
export const InventorySchema = SchemaFactory.createForClass(Inventory)