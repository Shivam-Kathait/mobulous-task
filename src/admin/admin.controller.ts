import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminLoginDto, ApprovalDto, Idto, Listing, NotificationListing, UpdateUserStatusDto } from './dto/create-admin.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RolesGuard } from 'src/authentication/guards/roles.guard';
import { Roles } from 'src/authentication/decorators/roles.decorator';
import { Role } from 'src/common/utils';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  /**
  * Handles the admin login request.
  * Accepts user admin data.
  *
  * @param {AdminLoginDto} dto - Data Transfer Object containing user login details.
  * @returns {Promise<any>} - Result from the login service.
  */
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin login Api` })
  @Post('login')
  async login(@Body() dto: AdminLoginDto): Promise<any> {
    return await this.adminService.login(dto)
  }

  /**
  * Handles the user list request.
  *
  * @param {Listing} dto - Data Transfer Object containing user listing details.
  * @returns {Promise<any>} - Result from the user List service.
  */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin user list Api` })
  @Get('usersList')
  async usersList(@Query() dto: Listing): Promise<any> {
    return await this.adminService.userList(dto)
  }

  /**
   * Updates a user's status (ACTIVE, BLOCKED, DELETED).
   *
   * @param {string} id - User ID to update.
   * @param {UpdateUserStatusDto} statusDto - DTO containing the new status.
   * @returns {Promise<any>} - Result from the user status update service.
   */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `Admin update user status Api` })
  @Patch('user/:id/status')
  async updateUserStatus(@Param() ID: Idto, @Body() dto: UpdateUserStatusDto): Promise<any> {
    return await this.adminService.updateUserStatus(ID.id, dto)
  }

  /**
 * Updates a user's approval status (approve or reject).
 *
 * @param {string} id - User ID to update.
 * @param {ApprovalDto} dto - DTO containing the approval status.
 * @returns {Promise<any>} - Result from the user approval update service.
 */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json')
  @ApiOperation({ summary: `Admin update user approval status API` })
  @Patch('user/:id/approval')
  async updateUserApproval(@Param() ID: Idto, @Body() dto: ApprovalDto): Promise<any> {
    return await this.adminService.approvalStatus(ID.id, dto);
  }
  
  /**
 * Admin notification listing.
 *
 * @param {ApprovalDto} dto - DTO containing the listing details.
 * @returns {Promise<any>} - Result from the admin service .
 */
  @ApiBearerAuth("authorization")
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes('application/json')
  @ApiOperation({ summary: `Admin notification listing API` })
  @Get('notification')
  async notification(@Query() dto: NotificationListing): Promise<any> {
    return await this.adminService.notification(dto);
  }
}
