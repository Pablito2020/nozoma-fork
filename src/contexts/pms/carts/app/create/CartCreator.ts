import UuidVo from "@shared/domain/UuidVo";
import CartProductList from "@pms-contexts/carts/domain/CartProductList";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";

export default class CartCreator {
    constructor(
        readonly repo: CartRepository
    ) {
    }

    async run(
        id: UuidVo,
        products: CartProductList,
        isBought: boolean
    ): Promise<Cart> {
        const cart = Cart.create(
            id,
            products,
            isBought
        );
        await this.repo.save(cart);
        return cart;
    }

}
