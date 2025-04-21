import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { PaginationOptions } from "./interfaces";

@Injectable()
export class CommonServices {
    constructor() { }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);  // salt round 10
    }

    async compareHash(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }


    setOptions = async (pagination?: string | number, limit?: string | number): Promise<PaginationOptions> => {
        try {
          const parsedLimit = typeof limit !== 'undefined' ? parseInt(limit as string) : 10;
          const parsedPagination = typeof pagination !== 'undefined' ? parseInt(pagination as string) : 0;
      
          const options: PaginationOptions = {
            lean: true,
            sort: { _id: -1 },
            limit: parsedLimit,
            skip: parsedPagination * parsedLimit,
          };
      
          return options;
        } catch (err) {
          throw err;
        }
      }
      
}