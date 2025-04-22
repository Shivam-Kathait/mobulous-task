import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
