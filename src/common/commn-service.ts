import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommonServices {
    constructor() { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);  // salt round 10
    }

    async compareHash(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}