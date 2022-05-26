import UuidVo from "@shared/domain/UuidVo";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";
import {Nullable} from "@shared/domain/Nullable";
import {ProductRepository} from "@pms-contexts/products/domain/ProductRepository";
import Product from "@pms-contexts/products/domain/Product";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import ProductDoesNotExist from "@pms-contexts/carts/domain/ProductDoesNotExist";

export default class CartProductAdder {
    constructor(
        readonly cartRepo: CartRepository,
        readonly productRepo: ProductRepository
    ) {
    }

    async run(
        cartId: UuidVo,
        productId: UuidVo
    ): Promise<Cart> {
        const cart: Nullable<Cart> = await this.cartRepo.findById(cartId),
            product: Nullable<Product> = await this.productRepo.findById(productId)
        if (!cart)
            throw new CartDoesNotExist("Cart with id: " + cartId + " does not exists")
        if (!product)
            throw new ProductDoesNotExist("Product with id: " + productId + " does not exists")
        // eslint-disable-next-line one-var
        const updatedCart = cart.addProduct(product);
        await this.cartRepo.update(updatedCart);
        return updatedCart;
    }

}
