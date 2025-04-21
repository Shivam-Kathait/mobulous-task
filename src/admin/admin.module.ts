import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CommonServices } from 'src/common/commn-service';
import { MongooseModule } from '@nestjs/mongoose';
import { usersModels } from 'src/users/entities';
import { AuthService } from 'src/authentication/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature(usersModels)
  ],
  controllers: [AdminController],
  providers: [AdminService, CommonServices, AuthService],
})
export class AdminModule { }
