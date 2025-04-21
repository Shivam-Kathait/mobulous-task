import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, SignupDto } from './dto/create-user.dto';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

 /**
 * Handles the user signup request.
 * Accepts user registration data.
 *
 * @param {SignupDto} dto - Data Transfer Object containing user signup details.
 * @returns {Promise<any>} - Result from the signup service.
 */
  @Post('signup')
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `User Signup Api` })
  async signup(@Body() dto: SignupDto): Promise<any> {
    return await this.usersService.signup(dto)
  }


  /**
 * Handles the user login request.
 * Accepts user login data.
 *
 * @param {LoginDto} dto - Data Transfer Object containing user login details.
 * @returns {Promise<any>} - Result from the signup service.
 */
  @Post('login')
  @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
  @ApiOperation({ summary: `User login Api` })
  async login(@Body() dto: LoginDto): Promise<any> {
    return await this.usersService.login(dto)
  }
}
