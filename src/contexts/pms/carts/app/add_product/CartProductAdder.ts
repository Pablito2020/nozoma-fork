import UuidVo from "@shared/domain/UuidVo";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";
import Product from "@pms-contexts/products/domain/Product";
import CartAlreadyBought from "@pms-contexts/carts/domain/CartAlreadyBought";
import {QueryBus} from "@shared/domain/bus/query/QueryBus";
import SearchProductQuery from "@pms-contexts/products/app/get/SearchProductQuery";
import SearchCartQuery from "@pms-contexts/carts/app/search/SearchCartQuery";

export default class CartProductAdder {
    constructor(
        readonly queryBus: QueryBus,
        readonly cartRepo: CartRepository,
    ) {
    }

    async run(
        cartId: UuidVo,
        productId: UuidVo
    ): Promise<Cart> {
        const product: Product = (await this.queryBus.ask(new SearchProductQuery(productId.value))).data,
            cart: Cart = (await this.queryBus.ask(new SearchCartQuery(cartId.value))).data;
        if (cart.isBought)
            throw new CartAlreadyBought(`Cart with id: ${cartId} is already bought`)
        // eslint-disable-next-line one-var
        const updatedCart = cart.addProduct(product);
        await this.cartRepo.update(updatedCart);
        return updatedCart;
    }

}
