import {DomainEvent} from "@shared/domain/bus/event/DomainEvent";
import {ProductPrimitives} from "@pms-contexts/products/domain/ProductPrimitives";

export default class ProductCreatedEvent extends DomainEvent {
    static EVENT_NAME = 'backoffice.product.ProductCreatedEvent';

    constructor(readonly body: ProductPrimitives) {
        super(
            ProductCreatedEvent.EVENT_NAME, body.id,
        );
    }

    toPrimitives(): ProductPrimitives {
        return this.body;
    }

    static fromPrimitives(body: ProductPrimitives): DomainEvent {
        return new ProductCreatedEvent(body);
    }

}
