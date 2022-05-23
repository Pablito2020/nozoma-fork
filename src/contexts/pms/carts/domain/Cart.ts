import Aggregate from '@shared/domain/Aggregate';
import UuidVo from '@shared/domain/UuidVo';
import ProductListVo from "@pms-contexts/carts/domain/ProductListVo";
import {CartPrimitives} from "@pms-contexts/carts/domain/CartPrimitives";
import ProductVo from "@pms-contexts/carts/domain/ProductVo";

export default class Cart extends Aggregate {
    constructor(
        readonly id: UuidVo,
        readonly products: ProductListVo,
        readonly isBought: boolean
    ) {
        super();
    }

    static create(
        id: UuidVo,
        products: ProductListVo,
        isBought: boolean
    ): Cart {
        return new Cart(
            id,
            products,
            isBought
        );
    }

    static fromPrimitives({
        id,
        products,
        isBought
    }: CartPrimitives): Cart {
        return new Cart(
            new UuidVo(id),
            new ProductListVo(products),
            isBought
        )
    }

    toPrimitives(): CartPrimitives {
        return {
            id: this.id.value,
            products: this.products.value.map((product: ProductVo) => {return product.value}),
            isBought: this.isBought
        };
    }

}
