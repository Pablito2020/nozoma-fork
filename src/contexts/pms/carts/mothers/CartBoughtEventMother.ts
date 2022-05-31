import Cart from "@pms-contexts/carts/domain/Cart";
import {DomainEvent} from "@shared/domain/bus/event/DomainEvent";
import CartBoughtEvent from "@pms-contexts/carts/domain/CartBoughtEvent";

export default class CartBoughtEventMother {
    static fromCart(cart: Cart): DomainEvent {
        return new CartBoughtEvent(cart.toPrimitives());
    }
}
