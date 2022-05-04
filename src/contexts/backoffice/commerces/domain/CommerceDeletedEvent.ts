import {DomainEvent} from "@shared/domain/bus/event/DomainEvent";
import {CommercePrimitives} from "@backoffice-contexts/commerces/domain/CommercePrimitives";

export default class CommerceDeletedEvent extends DomainEvent {
    static EVENT_NAME = 'backoffice.commerces.CommercDeletedEvent';

    constructor(readonly body: CommercePrimitives) {
        super(
            CommerceDeletedEvent.EVENT_NAME, body.id,
        );
    }

    toPrimitives(): CommercePrimitives {
        return this.body;
    }


}