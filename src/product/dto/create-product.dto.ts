import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    warehouse_id: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

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

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    search: string;
}