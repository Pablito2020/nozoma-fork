import { DomainEvent, DomainEventClass } from '@shared/domain/bus/event/domain-event';

export interface DomainEventSubscriber<T extends DomainEvent> {
    subscribedTo(): Array<DomainEventClass>;

    on(domainEvent: T): void;
}
