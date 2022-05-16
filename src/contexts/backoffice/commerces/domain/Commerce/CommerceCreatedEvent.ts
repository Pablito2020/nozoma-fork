import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';
import { CommercePrimitives } from '@backoffice-contexts/commerces/domain/Commerce/CommercePrimitives';

export default class CommerceCreatedEvent extends DomainEvent {
    static EVENT_NAME = 'backoffice.commerces.CommerceCreatedEvent';

    constructor(readonly body: CommercePrimitives) {
        super(
            CommerceCreatedEvent.EVENT_NAME, body.id,
        );
    }

    toPrimitives(): CommercePrimitives {
        return this.body;
    }

}
