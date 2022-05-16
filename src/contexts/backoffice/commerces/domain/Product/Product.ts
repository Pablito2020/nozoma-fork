import Aggregate from '@shared/domain/Aggregate';
import UuidVo from '@shared/domain/UuidVo';
import ProductNameVo from "@backoffice-contexts/commerces/domain/Product/ProductNameVo";
import ProductDescriptionVo from "@backoffice-contexts/commerces/domain/Product/ProductDescriptionVo";
import {ProductPrimitives} from "@backoffice-contexts/commerces/domain/Product/ProductPrimitives";
import ProductPriceVo from "@backoffice-contexts/commerces/domain/Product/ProductPriceVo";
import ProductCreatedEvent from "@backoffice-contexts/commerces/domain/Product/ProductCreatedEvent";


export default class Commerce extends Aggregate {
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
    ): Commerce {
        const product = new Commerce(
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
    }: ProductPrimitives): Commerce {
        return new Commerce(
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
