import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { ProductPrimitives } from '@backoffice-contexts/products/domain/ProductPrimitives';

export default class ProductCreatedEvent extends DomainEvent {
    static EVENT_NAME = 'backoffice.commerces.ProductCreatedEvent';

    constructor(readonly body: ProductPrimitives) {
        super(
            ProductCreatedEvent.EVENT_NAME, body.id,
        );
    }

    toPrimitives(): ProductPrimitives {
        return this.body;
    }

}
