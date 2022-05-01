import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export interface EventBus {
    publish(events: Array<DomainEvent>): Promise<void>;
}
