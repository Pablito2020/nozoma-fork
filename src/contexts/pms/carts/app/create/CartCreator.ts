import UuidVo from "@shared/domain/UuidVo";
import CartProductList from "@pms-contexts/carts/domain/CartProductList";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";
import {Nullable} from "@shared/domain/Nullable";
import AlreadyExists from "@shared/domain/AlreadyExists";

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
        const cartWithId: Nullable<Cart> = await this.repo.findById(id)
        if (cartWithId)
            throw new AlreadyExists("Cart already exists")
        // eslint-disable-next-line one-var
        const cart = Cart.create(
            id,
            products,
            isBought
        );
        await this.repo.save(cart);
        return cart;
    }

}
