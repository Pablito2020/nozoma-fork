import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";
import { EventAWSBus } from "@shared/domain/bus/event/EventAWSBus";
//import {EventBridge} from "aws-sdk";

export default class AWSEventBus implements EventAWSBus {

    async publish(events: Array<DomainEvent>): Promise<void> {
        console.log("Events to be published:" + events)
        const eventBridge = new EventBridge()
        const entries = []
        for (const event of events) {
            entries.push({
                Source: event.eventName,
                DetailType: event.eventName,
                Detail: event.toPrimitives,
                EventBusName: "pms-ferran-pablo-event-bus"
            })
        } 
        const params = {
            Entries: entries
        }
        return eventBridge.putEvents(params).promise()
    }
}
