import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { ApprovalStatus, Status } from "src/common/utils";

export class AdminLoginDto {
    @ApiProperty({ default: "admin@gmail.com" })
    @IsEmail({}, { message: 'Email must be an valid email address' })
    @IsString()
    email: string;

    @ApiProperty({ default: "Asdfghjkl@1" })
    @IsNotEmpty({ message: 'password is required' })
    @IsString()
    password: string;
}

export class Listing {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    pagination: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    limit: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    search: string;
}

export class NotificationListing {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    pagination: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    limit: string;

}

export class UpdateUserStatusDto {
    @ApiProperty({
        description: 'User status',
        enum: Status,
        example: 'ACTIVE'
    })
    @IsEnum(Status, { message: 'Status must be ACTIVE, BLOCKED, or DELETED' })
    status: Status;
}

export class Idto {
    @ApiProperty({})
    @IsNotEmpty({ message: 'id is required' })
    @IsString()
    id: string
}


export class ApprovalDto {
    @ApiProperty({
        description: 'User Admin Approval status',
        enum: ApprovalStatus,
        example: 'APPROVED'
    })
    @IsEnum(ApprovalStatus, { message: 'AdminApprovalStatus must be APPROVED, REJECT' })
    adminApprovalStatus: ApprovalStatus;
}

export class ResponseUserDto {
    @IsString()
    _id: string | Types.ObjectId;;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    phone_number: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    adminApprovalStatus: string;

    @IsString()
    access_token: string;

    constructor(partial: Partial<ResponseUserDto>) {
        Object.assign(this, partial);
    }
}