import { Injectable } from "@nestjs/common";
import { Product, ProductDocument } from "./entities/product.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductAggregation {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async warehouseNearUser(long: number, lat: number, maxDistanceMeters: number): Promise<any> {
        return {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [long, lat],
                },
                distanceField: 'distance',
                spherical: true,
                maxDistance: maxDistanceMeters,
                key: 'location',
            },
        };
    }


    async products() {
        try {
            return {
                $lookup: {
                    from: 'products',
                    let: { warehouse_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$warehouse_id", "$$warehouse_id"] },
                                        { $gt: ["$quantity", 0] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                name: 1,
                                price: 1,
                                quantity: 1,
                                description: 1,
                            }
                        }

                    ],
                    as: "products"
                }
            }
        } catch (error) {
            throw error
        }
    }

    async unwind_products() {
        try {
            return {
                $unwind: "$products"
            }
        } catch (e) {
            throw e
        }
    }

    async group_product_listing() {
        try {
            return {
                $group: {
                    _id: "$products._id",
                    warehouse_id: { "$first": "$_id" },
                    name: { "$first": "$products.name" },
                    price: { "$first": "$products.price" },
                    quantity: { "$first": "$products.quantity" },
                    description: { "$first": "$products.description" },
                }
            }
        }
        catch (err) {
            throw err;
        }
    }

    async redactProduct(search: string) {
        try {
            return {
                $redact: {
                    $cond: {
                        if: {
                            $and: [
                                {
                                    $or: [
                                        { $eq: [search, undefined] },
                                        {
                                            $regexMatch: {
                                                input: "$products.name",
                                                regex: search,
                                                options: "i"
                                            }
                                        },
                                    ]
                                }
                            ]
                        },
                        then: "$$KEEP",
                        else: "$$PRUNE",
                    }
                }
            }
        } catch (err) {
            throw err
        }
    }

    async facetData(page: any, limit: any) {
        return {
            $facet: {
                metadata: [{ $count: "count" }],
                data: [
                    { $skip: parseInt(page) },
                    { $limit: parseInt(limit) },
                ],
            },
        };
    }

}