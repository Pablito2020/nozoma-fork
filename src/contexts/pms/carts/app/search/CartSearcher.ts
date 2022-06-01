import UuidVo from "@shared/domain/UuidVo";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";

export default class CartSearcher {
    constructor(
        readonly repo: CartRepository
    ) {

    }

    async run(
        id: UuidVo
    ): Promise<Cart> {
        const cart = await this.repo.findById(id);
        if (cart === null)
            throw new CartDoesNotExist(`Cart with id: ${id} does not exist`);
        return cart;
    }
}
