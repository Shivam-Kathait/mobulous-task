import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto, Listing } from './dto/create-warehouse.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Role } from 'src/common/utils';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) { }

  /**
 * Handles the admin warehouse request.
 *
 * @param {CreateWarehouseDto} dto - Data Transfer Object containing warehouse details.
 * @returns {Promise<any>} - Result from the warehouse service.
 */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin create warehouse Api` })
  @Post()
  createWarehouse(@Body() dto: CreateWarehouseDto): Promise<any> {
    return this.warehouseService.createWarehouse(dto); 
  }


  /**
 * Handles the admin warehouse request.
 *
 * @param {Listing} dto - Data Transfer Object containing warehouse listing details.
 * @returns {Promise<any>} - Result from the warehouse service.
 */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin warehouse listing Api` })
  @Get('listing')
  warehouseListing(@Query() dto: Listing): Promise<any> {
    return this.warehouseService.warehouseListing(dto);
  }
}
