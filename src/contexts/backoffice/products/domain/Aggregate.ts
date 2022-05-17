import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export default abstract class Aggregate {
    private domainEvents: Array<DomainEvent>;

    protected constructor() {
        this.domainEvents = [];
    }

    pullDomainEvents(): Array<DomainEvent> {
        const events = this.domainEvents
        this.domainEvents = []
        return events;
    }

    record(event: DomainEvent): void {
        this.domainEvents.push(event);
    }

    abstract toPrimitives(): any;

}