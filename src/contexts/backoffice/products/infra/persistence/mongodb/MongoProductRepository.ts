import { Nullable } from "@shared/domain/Nullable";
import Product from "@backoffice-contexts/products/domain/Product";
import UuidVo from "@shared/domain/UuidVo";
import { Collection, Db } from "mongodb";
import {ProductRepository} from "@backoffice-contexts/products/domain/ProductRepository";

const COLLECTION = "Commerces";
export default class MongoProductRepository implements ProductRepository {
    private collection: Collection<any>;

    constructor(db: Db) {
        this.collection = db.collection(COLLECTION);
    }


    async findById(id: UuidVo): Promise<Nullable<Product>> {
        const found = await this.collection.findOne({_id: id.value});
        return Product.fromPrimitives({
            ...found,
            id: found._id
        });

    }

    async save(product: Product): Promise<void> {
        const {
            id,
            ...primitives
        } = product.toPrimitives();
        await this.collection.insertOne({
            ...primitives,
            _id: id,
            id: undefined
        });

    }
}