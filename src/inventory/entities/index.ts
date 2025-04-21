import { ModelDefinition } from "@nestjs/mongoose";
import { Inventory, InventorySchema } from "./inventory.entity";

export const inventoryModels: ModelDefinition[] = [
    { name: Inventory.name, schema: InventorySchema },
]