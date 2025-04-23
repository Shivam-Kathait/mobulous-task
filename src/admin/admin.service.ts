import { Injectable } from '@nestjs/common';
import { AdminLoginDto, ApprovalDto, Listing, NotificationListing, ResponseUserDto, UpdateUserStatusDto } from './dto/create-admin.dto';
import { ConfigService } from '@nestjs/config';
import { CommonServices } from 'src/common/commn-service';
import { Role } from 'src/common/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/users/entities/user.entity';
import { FilterQuery, Model, Types } from 'mongoose';
import * as Errors from "../error-handler/error-service";
import { AuthService } from 'src/authentication/auth.service';
import { Query } from 'src/common/interfaces';
import { validate } from 'class-validator';
import { Notification, NotificationDocument } from './entities/notification.entity';

@Injectable()
export class AdminService {
  private option = { lean: true, sort: { _id: -1 } } as const;
  private newOptions = { new: true, lean: true, sort: { _id: -1 } } as const;


  private readonly ADMIN_EMAIL: string
  private readonly PASSWORD: string
  constructor(
    private readonly configService: ConfigService,
    private readonly commonServices: CommonServices,
    private readonly authService: AuthService,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>
  ) {
    this.ADMIN_EMAIL = this.configService.get<string>("ADMIN_EMAIL")
    this.PASSWORD = this.configService.get<string>("PASSWORD")

    this.create_admin()
  }

  async create_admin() {
    let query = { email: this.ADMIN_EMAIL.toLowerCase() }
    let is_admin = await this.userModel.findOne(query, {}, { lean: true })
    if (!is_admin) {
      let hashPassword = await this.commonServices.hashPassword(this.PASSWORD)
      let data = {
        email: this.ADMIN_EMAIL.toLowerCase(),
        password: hashPassword,
        role: Role.ADMIN,
        createdAt: Date.now()
      }
      await this.userModel.create(data)
    }
  }


  async login(dto: AdminLoginDto) {
    try {
      let { email, password } = dto;
      const query = { email: email.toLowerCase() };
      let is_admin = await this.userModel.findOne(query, {}, this.option);
      if (!is_admin) throw new Errors.UserNotExist();
      let is_password = await this.commonServices.compareHash(password, is_admin.password);
      if (!is_password) throw new Errors.InvalidPassword();
      let access_token = await this.authService.generateToken(is_admin._id, is_admin.role);
      let data = { message: "Login SuccesFully", access_token }
      return data
    } catch (error) {
      throw error
    }
  }

  async userList(dto: Listing) {
    try {
      let { pagination, limit, search } = dto;
      let options = await this.commonServices.setOptions(pagination, limit);
      let query: FilterQuery<UsersDocument> = { role: Role.USER };
      let count = await this.userModel.countDocuments(query);
      let projection = { password: 0, role: 0 }
      if (search) {
        query.$or = [
          { first_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone_number: { $regex: search, $options: "i" } },
        ];
      }
      let users = await this.userModel.find(query, projection, options);
      let result = { count, data: users }
      return result
    } catch (error) {
      throw error
    }
  }

  async updateUserStatus(user_id: string, dto: UpdateUserStatusDto) {
    try {
      let { status } = dto;
      let query = { _id: new Types.ObjectId(user_id) };
      let update = { status: status };
      let updateUser = await this.userModel.findByIdAndUpdate(query, update, this.newOptions);
      if (!updateUser) throw new Errors.UserNotExist();
      const response = new ResponseUserDto(updateUser);
      await validate(response, { whitelist: true });
      return { data: response }
    } catch (error) {
      throw error
    }
  }

  async approvalStatus(user_id: string, dto: ApprovalDto) {
    try {
      let { adminApprovalStatus } = dto;
      let query = { _id: new Types.ObjectId(user_id) };
      let update = { adminApprovalStatus };
      let updateUser = await this.userModel.findByIdAndUpdate(query, update, this.newOptions);
      if (!updateUser) throw new Errors.UserNotExist();
      const response = new ResponseUserDto(updateUser);
      await validate(response, { whitelist: true });
      return { data: response }
    } catch (error) {
      throw error
    }
  }

  async notification(dto: NotificationListing) {
    try {
      let { pagination, limit } = dto
      let options = await this.commonServices.setOptions(pagination, limit);
      let count = await this.notificationModel.countDocuments({});
      let notification = await this.notificationModel.find({}, {}, options);
      let response = { count, data: notification }
      return response
    } catch (error) {
      throw error
    }
  }
}
