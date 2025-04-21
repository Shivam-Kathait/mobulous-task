import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ versionKey: false })
export class Warehouse {
    
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    location: string;

    @Prop({ type: Date })
    createdAt: Date;
}

export type WarehouseDocument = HydratedDocument<Warehouse>
export const WarehouseSchema = SchemaFactory.createForClass(Warehouse)
