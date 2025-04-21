import { Types } from "mongoose";

export interface Query {
  [key: string]: string | Types.ObjectId | boolean;
}

export interface PaginationOptions {
  lean: boolean;
  sort: Record<string, number>;
  limit: number;
  skip: number;
}