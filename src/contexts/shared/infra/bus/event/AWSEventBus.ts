import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";
import { EventAWSBus } from "@shared/domain/bus/event/EventAWSBus";
//import {EventBridge} from "aws-sdk";

export default class AWSEventBus implements EventAWSBus {

    async publish(events: Array<DomainEvent>): Promise<void> {
        console.log("Events to be published:" + JSON.stringify(events))
        const eventBridge = new EventBridge()
        const detail = {round: round.toString()}
        const params = {
            Entries: [
                {
                    Source: events.toString(),
                    DetailType: "create-product-event",
                    Detail: JSON.stringify(detail),
                    EventBusName: "create-product-event-bus"
                },
            ]
        }
        return eventBridge.putEvents(params).promise()
    }
}
