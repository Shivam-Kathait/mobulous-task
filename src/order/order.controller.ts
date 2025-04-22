import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Role } from 'src/common/utils';

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
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

}
