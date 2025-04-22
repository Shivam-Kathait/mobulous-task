import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, Listing } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from 'src/common/utils';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /**
  * Handles the admin product request.
  *
  * @param {CreateProductDto} dto - Data Transfer Object containing product details.
  * @returns {Promise<any>} - Result from the product service.
  */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin create product Api` })
  @Post()
  create(@Body() dto: CreateProductDto): Promise<any> {
    return this.productService.createProduct(dto);
  }

  /**
   * Handles the admin product listing request.
   *
   * @param {Listing} dto - Data Transfer Object containing product listing details.
   * @returns {Promise<any>} - Result from the product service.
   */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin product listing Api` })
  @Get('listing/admin')
  productListingAdmin(@Query() dto: Listing): Promise<any> {
    return this.productService.productListingAdmin(dto);
  }

  /**
  * Handles the user product listing request.
  *
  * @param {Listing} dto - Data Transfer Object containing product details.
  * @returns {Promise<any>} - Result from the product service.
  */
  @ApiBearerAuth("authorization")
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `User product listing Api` })
  @Get('listing/user')
  productListingUser(@Query() dto: Listing, @Request() req): Promise<any> {
    return this.productService.productListingUser(dto, req.user);
  }
}
