import { DomainEvent } from '@shared/domain/bus/event/domain-event';

export default abstract class Aggregate {
    readonly domainEvents: Array<DomainEvent>;

    protected constructor() {
        this.domainEvents = [];
    }

    pullDomainEvents(): Array<DomainEvent> {
        return this.domainEvents;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    abstract toPrimitives(): any;
}
