import { DomainEvent } from '@shared/domain/bus/event/DomainEvent';

export interface EventAWSBus {
    publish(events: Array<DomainEvent>): Promise<void>;
}
