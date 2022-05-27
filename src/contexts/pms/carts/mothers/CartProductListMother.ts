import CartProductList from "@pms-contexts/carts/domain/CartProductList";
import Product from "@pms-contexts/products/domain/Product";
import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";

export default class CartProductListMother {

    static empty() : CartProductList {
        return new CartProductList(
            []
        )
    }

    static withProducts(products: Product[]): CartProductList {
        const productsPrimitives = new Array<CartProductPrimitives>();
        for (const product of products) {
            productsPrimitives.push({
                productId: product.id.value,
                commerceId: product.commerceId.value,
                price: product.price.value
            });
        }
        return new CartProductList(productsPrimitives)
    }

}
