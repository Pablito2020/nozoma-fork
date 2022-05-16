import UuidVo from "@shared/domain/UuidVo";
import {ProductRepository} from "@pms-contexts/products/domain/ProductRepository";
import ProductNameVo from "@pms-contexts/products/domain/ProductNameVo";
import ProductDescriptionVo from "@pms-contexts/products/domain/ProductDescriptionVo";
import Product from "@pms-contexts/products/domain/Product";
import PriceVo from "@pms-contexts/products/domain/PriceVo";

export default class ProductCreator {
    constructor(
        readonly repo: ProductRepository
    ) {
    }

    async run(
        id: UuidVo,
        commerceId: UuidVo,
        name: ProductNameVo,
        price: PriceVo,
        description: ProductDescriptionVo,
    ): Promise<Product> {
        const product = Product.create(
            id,
            commerceId,
            name,
            price,
            description
        );
        await this.repo.save(product);
        return product;
    }

}
