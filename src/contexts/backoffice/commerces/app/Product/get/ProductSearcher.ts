import UuidVo from "@shared/domain/UuidVo";
import Product from "@backoffice-contexts/commerces/domain/Product/Product";
import NotExistsProductException from "@backoffice-contexts/commerces/domain/Product/NotExistsProduct";
import {ProductRepository} from "@backoffice-contexts/commerces/domain/Product/ProductRepository";


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