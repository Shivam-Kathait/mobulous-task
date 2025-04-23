import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApprovalStatus, OrderStatus } from "src/common/utils";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    product_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    warehouse_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
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
}

export class IdDto {
    @ApiProperty({})
    @IsNotEmpty({ message: 'id is required' })
    @IsString()
    id: string
}

export class UpdateStatus {
    @ApiProperty({})
    @IsNotEmpty({ message: 'status is required' })
    @IsEnum(OrderStatus)
    status: OrderStatus
}