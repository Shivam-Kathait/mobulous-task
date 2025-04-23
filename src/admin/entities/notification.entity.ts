import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { NotificationType } from "src/common/utils";
import { Product } from "src/product/entities/product.entity";

@Schema({ versionKey: false })
export class Notification {
    @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
    product_id: Types.ObjectId

    @Prop({ type: String, default: null })
    message: string;

    @Prop({ type: Date })
    createdAt: Date;
}

export type NotificationDocument = HydratedDocument<Notification>
export const NotificationSchema = SchemaFactory.createForClass(Notification)