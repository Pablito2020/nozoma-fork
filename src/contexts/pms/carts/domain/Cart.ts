import Aggregate from '@shared/domain/Aggregate';
import UuidVo from '@shared/domain/UuidVo';
import CartProductList from "@pms-contexts/carts/domain/CartProductList";
import {CartPrimitives} from "@pms-contexts/carts/domain/CartPrimitives";
import Product from "@pms-contexts/products/domain/Product";
import CartBoughtEvent from "@pms-contexts/carts/domain/CartBoughtEvent";

export default class Cart extends Aggregate {
    constructor(
        readonly id: UuidVo,
        readonly products: CartProductList,
        readonly isBought: boolean
    ) {
        super();
    }

    static create(
        id: UuidVo,
        products: CartProductList,
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
            new CartProductList(products),
            isBought
        )
    }

    toPrimitives(): CartPrimitives {
        return {
            id: this.id.value,
            products: this.products.getCartProductPrimitives(),
            isBought: this.isBought
        };
    }

    addProduct(product: Product): Cart  {
        return new Cart(
            this.id,
            this.products.addProduct(product.id, product.commerceId, product.price),
            this.isBought
        )
    }

    buy(): Cart {
        const cart = new Cart(
            this.id,
            this.products,
            true
        )
        cart.record(new CartBoughtEvent(cart.toPrimitives()))
        return cart
    }

}
