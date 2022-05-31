import UuidVo from "@shared/domain/UuidVo";
import ValueObject from "@shared/domain/ValueObject";
import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";
import PriceVo from "@pms-contexts/products/domain/PriceVo";

export default class CartProductVo extends ValueObject<CartProductPrimitives>{

    constructor(productId: UuidVo, commerceId: UuidVo, price: PriceVo) {
        super({
            productId: productId.value,
            commerceId: commerceId.value,
            price: price.value
        });
    }

    toString(): string {
        return this.value.toString();
    }
}
