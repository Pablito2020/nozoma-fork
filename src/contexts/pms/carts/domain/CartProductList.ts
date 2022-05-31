import CartProductVo from "@pms-contexts/carts/domain/CartProductVo";
import UuidVo from "@shared/domain/UuidVo";
import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";
import PriceVo from "@pms-contexts/products/domain/PriceVo";

export default class CartProductList {
    private products: Array<CartProductVo>

    constructor(productList: Array<CartProductPrimitives>) {
        this.products = new Array<CartProductVo>()
        for (const {productId, commerceId, price} of productList)
            this.products.push(new CartProductVo(new UuidVo(productId),
                                                 new UuidVo(commerceId),
                                                 new PriceVo(price)))
    }

    getCartProductPrimitives(): Array<CartProductPrimitives> {
        return this.products.map((product: CartProductVo) => {
            return product.value
        })
    }

    addProduct(productId: UuidVo, commerceId: UuidVo, price: PriceVo): CartProductList {
        const newProducts = this.getCartProductPrimitives()
        newProducts.push({
            productId: productId.value,
            commerceId: commerceId.value,
            price: price.value
        });
        return new CartProductList(newProducts)
    }

    isEmpty(): boolean {
        return this.products.length === 0
    }

}
