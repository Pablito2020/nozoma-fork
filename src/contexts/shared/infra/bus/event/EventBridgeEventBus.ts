import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";
import { EventBus } from "@shared/domain/bus/event/EventBus";
import { Logger } from "@shared/domain/Logger";
import {EventBridge} from "aws-sdk";
import { PutEventsRequestEntry } from "aws-sdk/clients/cloudwatchevents";

export default class EventBridgeEventBus implements EventBus {
    
    constructor(readonly logger:Logger){
    }
    
    async publish(events: Array<DomainEvent>): Promise<void> {
        this.logger.info("Events to be published:" + events)
        const eventBridge = new EventBridge(),
            entries: Array<PutEventsRequestEntry> = []
        for (const event of events) {
            entries.push({
                Source: event.eventName,
                DetailType: event.eventName,
                Detail: JSON.stringify(event.toPrimitives()),
                EventBusName: "nozoma-ferran-pablo-joel-patrick-event-bus"
            })
        } 
        // eslint-disable-next-line one-var
        const params = {
            Entries: entries
        }
        await eventBridge.putEvents(params).promise()
    }
   
}
