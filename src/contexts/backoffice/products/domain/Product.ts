import Aggregate from '@shared/domain/Aggregate';
import UuidVo from '@shared/domain/UuidVo';
import ProductNameVo from "@backoffice-contexts/products/domain/ProductNameVo";
import ProductDescriptionVo from "@backoffice-contexts/products/domain/ProductDescriptionVo";
import {ProductPrimitives} from "@backoffice-contexts/products/domain/ProductPrimitives";
import ProductPriceVo from "@backoffice-contexts/products/domain/ProductPriceVo";
import ProductCreatedEvent from "@backoffice-contexts/products/domain/ProductCreatedEvent";


export default class Product extends Aggregate {
    constructor(
        readonly id: UuidVo,
        readonly commerceId: UuidVo,
        readonly name: ProductNameVo,
        readonly price: ProductPriceVo,
        readonly description: ProductDescriptionVo,
    ) {
        super();
    }

    static create(
        id: UuidVo,
        commerceId: UuidVo,
        name: ProductNameVo,
        price: ProductPriceVo,
        description: ProductDescriptionVo,
    ): Product {
        const product = new Product(
            id,
            commerceId,
            name,
            price,
            description,
        );
        product.record(new ProductCreatedEvent(product.toPrimitives()));
        return product;
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
            new ProductPriceVo(price),
            new ProductDescriptionVo(description),
        )
    }

    toPrimitives(): ProductPrimitives {
        return {
            id: this.id.value,
            commerceId: this.commerceId.value,
            name: this.name.value,
            price: this.price.value,
            description: this.description.value,
        };
    }
}
