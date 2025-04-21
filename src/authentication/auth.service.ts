import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import { Types } from "mongoose";

@Injectable()
export class AuthService {
    private JWT_ACCESS_SECRET: string
    private JWT_ACCESS_EXPIRY: string
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.JWT_ACCESS_SECRET = this.configService.get<string>('JWT_ACCESS_SECRET'),
            this.JWT_ACCESS_EXPIRY = this.configService.get<string>('JWT_ACCESS_EXPIRY')
    }


    async generateToken(_id: Types.ObjectId | string, role: string) {
        return await this.jwtService.sign(
            { _id, role },
            {
                secret: this.JWT_ACCESS_SECRET,
                expiresIn: this.JWT_ACCESS_EXPIRY
            }
        );
    }
    
}