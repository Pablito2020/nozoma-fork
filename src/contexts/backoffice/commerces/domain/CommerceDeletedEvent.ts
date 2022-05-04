import {DomainEvent} from "@shared/domain/bus/event/DomainEvent";

export default class CommerceDeletedEvent extends DomainEvent {
    toPrimitives(): unknown {
        return undefined;
    }


}