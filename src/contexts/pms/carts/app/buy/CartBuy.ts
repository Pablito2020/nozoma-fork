import UuidVo from "@shared/domain/UuidVo";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";
import {Nullable} from "@shared/domain/Nullable";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import {EventBus} from "@shared/domain/bus/event/EventBus";

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
            throw new CartDoesNotExist("Cart with id: " + id + " does not exists")
        // eslint-disable-next-line one-var
        const updatedCart = cart.buy();
        await this.cartRepo.update(updatedCart);
        this.eventBus.publish(updatedCart.pullDomainEvents());
        return updatedCart;
    }

}
