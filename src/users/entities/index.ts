import { ModelDefinition } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./user.entity";

export const usersModels: ModelDefinition[] = [
    { name: Users.name, schema: UsersSchema },
]