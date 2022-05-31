import UuidVo from "@shared/domain/UuidVo";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";
import {Nullable} from "@shared/domain/Nullable";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import {EventBus} from "@shared/domain/bus/event/EventBus";
import CartIsEmpty from "@pms-contexts/carts/domain/CartIsEmpty";
import CartAlreadyBought from "@pms-contexts/carts/domain/CartAlreadyBought";

export default class CartBuy {
    constructor(
        readonly cartRepo: CartRepository,
        readonly eventBus: EventBus,
    ) {
    }

    async run(
        id: UuidVo,
    ): Promise<Cart> {
        const cart: Nullable<Cart> = await this.cartRepo.findById(id);
        if (!cart)
            throw new CartDoesNotExist(`Cart with id: ${id} does not exists`)
        if (cart.products.isEmpty())
            throw new CartIsEmpty(`Cart with id: ${id} is empty`)
        if (cart.isBought)
            throw new CartAlreadyBought(`Cart with id: ${id} is already bought`)
        // eslint-disable-next-line one-var
        const updatedCart = cart.buy();
        await this.cartRepo.update(updatedCart);
        await this.eventBus.publish(updatedCart.pullDomainEvents());
        return updatedCart;
    }

}
