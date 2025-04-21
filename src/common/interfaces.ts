import { Types } from "mongoose";

export interface Query {
    [key: string]: string | Types.ObjectId | boolean;
  }