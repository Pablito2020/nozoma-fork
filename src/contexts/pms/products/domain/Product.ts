import Aggregate from '@shared/domain/Aggregate';
import UuidVo from '@shared/domain/UuidVo';
import ProductNameVo from "@pms-contexts/products/domain/ProductNameVo";
import ProductDescriptionVo from "@pms-contexts/products/domain/ProductDescriptionVo";
import {ProductPrimitives} from "@pms-contexts/products/domain/ProductPrimitives";
import PriceVo from "@pms-contexts/products/domain/PriceVo";

export default class Product extends Aggregate {
    constructor(
        readonly id: UuidVo,
        readonly commerceId: UuidVo,
        readonly name: ProductNameVo,
        readonly price: PriceVo,
        readonly description: ProductDescriptionVo
    ) {
        super();
    }

    static create(
        id: UuidVo,
        commerceId: UuidVo,
        name: ProductNameVo,
        price: PriceVo,
        description: ProductDescriptionVo,
    ): Product {
        return new Product(
            id,
            commerceId,
            name,
            price,
            description,
        );
    }

    static fromPrimitives({
        id,
        commerceId,
        name,
        price,
        description,
    }: ProductPrimitives): Product {
        return new Product(
            new UuidVo(id),
            new UuidVo(commerceId),
            new ProductNameVo(name),
            new PriceVo(price),
            new ProductDescriptionVo(description)
        )
    }

    toPrimitives(): ProductPrimitives {
        return {
            id: this.id.value,
            commerceId: this.commerceId.value,
            name: this.name.value,
            price: this.price.value,
            description: this.description.value
        };
    }

}
