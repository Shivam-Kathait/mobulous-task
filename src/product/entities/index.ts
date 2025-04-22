import { ModelDefinition } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./product.entity";

export const productModels: ModelDefinition[] = [
    { name: Product.name, schema: ProductSchema },
]