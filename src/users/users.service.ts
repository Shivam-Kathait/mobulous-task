import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { Query } from 'src/common/interfaces';
import { CommonServices } from 'src/common/commn-service';
import { Role } from 'src/common/utils';
import { AuthService } from 'src/authentication/auth.service';
import * as Errors from "../error-handler/error-service";

@Injectable()
export class UsersService {
  private option = { lean: true } as const;

  constructor(
    private readonly configService: ConfigService,
    private readonly commonServices: CommonServices,
    private readonly authService: AuthService,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>
  ) { }

  async signup(dto: SignupDto) {
    try {
      let { email, phone_number, password } = dto;
      let query: Query = { email: email.toLowerCase() }
      let projection = { email: 1, phone_number: 1 }
      let is_email = await this.userModel.findOne(query, projection, this.option);
      if (is_email) throw new Errors.EmailExist()
      query = { phone_number: phone_number }
      let is_phone = await this.userModel.findOne(query, projection, this.option);
      if (is_phone) throw new Errors.PhoneNumberExist()
      let hashPassword = await this.commonServices.hashPassword(password);
      let userData = {
        ...dto,
        email: email.toLowerCase(),
        password: hashPassword,
        role: Role.USER,
        created_at: Date.now()
      }
      let user = await this.userModel.create(userData);
      let access_token = await this.authService.generateToken(user._id, user.role);
      let data = { message: "Signup SuccesFully", access_token }
      return data
    } catch (error) {
      throw error
    }
  }

  async login(dto: LoginDto) {
    try {
      let { email, phone_number, password } = dto;
      if (!email && !phone_number) throw new Errors.MissingLoginCreds();
      const query = {
        $or: [
          email ? { email: email.toLowerCase() } : null,
          phone_number ? { phone_number: phone_number } : null,
        ].filter(Boolean)
      };
      let projection = {}
      let is_user = await this.userModel.findOne(query, projection, this.option);
      if (!is_user) throw new Errors.UserNotExist();
      let isPassword = await this.commonServices.compareHash(password, is_user.password);
      if (!isPassword) throw new Errors.InvalidPassword();
      let access_token = await this.authService.generateToken(is_user._id, is_user.role);
      let data = { message: "Login SuccesFully", access_token }
      return data
    } catch (error) {
      throw error
    }
  }
}
