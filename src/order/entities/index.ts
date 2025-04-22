import { ModelDefinition } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./order.entity";

export const orderModels: ModelDefinition[] = [
    { name: Order.name, schema: OrderSchema },
]