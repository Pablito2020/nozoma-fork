import { DomainEvent } from '@shared/domain/bus/event/domain-event';

export interface EventBus {
    publish(events: Array<DomainEvent>): Promise<void>;
}
