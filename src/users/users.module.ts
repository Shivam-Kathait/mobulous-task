import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usersModels } from './entities/index';
import { ConfigService } from '@nestjs/config';
import { CommonServices } from 'src/common/commn-service';
import { AuthService } from 'src/authentication/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature(usersModels) 
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService, CommonServices, AuthService],
  exports: [MongooseModule.forFeature(usersModels)]
})
export class UsersModule { }
