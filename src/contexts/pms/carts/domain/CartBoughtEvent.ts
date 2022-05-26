import {DomainEvent} from "@shared/domain/bus/event/DomainEvent";
import {CartPrimitives} from "@pms-contexts/carts/domain/CartPrimitives";

export default class CartBoughtEvent extends DomainEvent {
    static EVENT_NAME = 'pms.cart.CartBoughtEvent';

    constructor(readonly body: CartPrimitives) {
        super(
            CartBoughtEvent.EVENT_NAME, body.id,
        );
    }

    toPrimitives(): CartPrimitives {
        return this.body;
    }

    static fromPrimitives(body: CartPrimitives): DomainEvent {
        return new CartBoughtEvent(body);
    }

}
