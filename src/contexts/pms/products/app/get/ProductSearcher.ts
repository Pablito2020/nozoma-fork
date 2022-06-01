import UuidVo from "@shared/domain/UuidVo";
import Product from "@pms-contexts/products/domain/Product";
import {ProductRepository} from "@pms-contexts/products/domain/ProductRepository";
import NotExistsProductException from "@pms-contexts/products/domain/NotExistsProduct";


export default class ProductSearcher {
    constructor(
        readonly repo: ProductRepository
    ) {

    }

    async run(
        id: UuidVo
    ): Promise<Product> {
        const product = await this.repo.findById(id);
        if (product === null)
            throw new NotExistsProductException("Product not found: " + id);
        return product;
    }
}