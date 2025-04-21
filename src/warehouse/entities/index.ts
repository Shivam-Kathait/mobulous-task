import { ModelDefinition } from "@nestjs/mongoose";
import { Warehouse, WarehouseSchema } from "./warehouse.entity";

export const warehouseModels: ModelDefinition[] = [
    { name: Warehouse.name, schema: WarehouseSchema },
]