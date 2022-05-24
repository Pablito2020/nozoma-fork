import UuidVo from "@shared/domain/UuidVo";
import ValueObject from "@shared/domain/ValueObject";
import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";

export default class CartProductVo extends ValueObject<CartProductPrimitives>{

    constructor(productId: UuidVo, commerceId: UuidVo) {
        super({
            productId: productId.value,
            commerceId: commerceId.value
        });
    }

    toString(): string {
        return this.value.toString();
    }
}
