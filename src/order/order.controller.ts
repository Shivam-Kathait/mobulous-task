import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, Listing,IdDto, UpdateStatus } from './dto/create-order.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { OrderStatus, Role, Status } from 'src/common/utils';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  /**
   * Handles the user order request.
   *
   * @param {CreateOrderDto} dto - Data Transfer Object containing order details.
   * @returns {Promise<any>} - Result from the order service.
   */
  @ApiBearerAuth("authorization")
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `User create order Api` })
  @Post()
  create(@Body() dto: CreateOrderDto): Promise<any> {
    return this.orderService.create(dto);
  }

  /**
   * Handles the admin order listing request.
   *
   * @param {Listing} dto - Data Transfer Object containing order listing details.
   * @returns {Promise<any>} - Result from the order service.
   */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin order Listing Api` })
  @Get()
  ordrListing(@Query() dto: Listing): Promise<any> {
    return this.orderService.adminOrderList(dto);
  }

  /**
  * Handles the admin order listing request.
  *
  * @param {Listing} dto - Data Transfer Object containing order listing details.
  * @returns {Promise<any>} - Result from the order service.
  */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin order approval Api` })
  @Patch('admin/:id/approval')
  adminOrderApproval(@Param() ID: IdDto, @Body() dto: UpdateStatus): Promise<any> {
    return this.orderService.adminOrderApproval(ID.id, dto);
  }
}
