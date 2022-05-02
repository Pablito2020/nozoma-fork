import { EventBus } from "@shared/domain/bus/event/EventBus";
import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";

export default class LoggerEventBus implements EventBus {

    async publish(events: Array<DomainEvent>): Promise<void> {
        console.log("Events to be published:" + JSON.stringify(events))
    }
}



