import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ versionKey: false })
export class Warehouse {

    @Prop({ type: String })
    name: string;

    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    })
    location: { type: string, coordinates: number[] };

    @Prop({ type: String })
    description: string;

    @Prop({ type: Date })
    createdAt: Date;
}
export type WarehouseDocument = HydratedDocument<Warehouse>
export const WarehouseSchema = SchemaFactory.createForClass(Warehouse)
WarehouseSchema.index({ location: '2dsphere' });
