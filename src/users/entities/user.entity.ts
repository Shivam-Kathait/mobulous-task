import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApprovalStatus, Role, Status } from "src/common/utils";

@Schema({ versionKey: false })
export class Users {

    @Prop({ type: String })
    first_name: string;

    @Prop({ type: String })
    last_name: string;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String })
    phone_number: string;

    @Prop({ type: String })
    password: string;

    // should approved from admin then user can login
    @Prop({ type: String, enum: ApprovalStatus, default: ApprovalStatus.PENDING })
    adminApprovalStatus: ApprovalStatus;
    
    @Prop({ type: String, default: Status.ACTIVE, enum: Status })
    status: string;

    @Prop({ type: String, default: Role.USER, enum: Role })
    role: string;

    @Prop({ type: Date })
    createdAt: Date;
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);