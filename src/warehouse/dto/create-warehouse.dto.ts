import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWarehouseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'latitude is required' })
    @IsString()
    latitude: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'longitude is required' })
    @IsString()
    longitude: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;
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