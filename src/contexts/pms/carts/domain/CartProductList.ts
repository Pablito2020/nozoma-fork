import CartProductVo from "@pms-contexts/carts/domain/CartProductVo";
import UuidVo from "@shared/domain/UuidVo";
import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";

export default class CartProductList {
    private products: Array<CartProductVo>

    constructor(productList: Array<CartProductPrimitives>) {
        this.products = new Array<CartProductVo>()
        for (const {productId, commerceId} of productList)
            this.products.push(new CartProductVo(new UuidVo(productId), new UuidVo(commerceId)))
    }

    getCartProductPrimitives(): Array<CartProductPrimitives> {
        return this.products.map((product: CartProductVo) => {return product.value})
    }

}
