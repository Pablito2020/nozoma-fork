import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";
import { EventBus } from "@shared/domain/bus/event/EventBus";
import { Logger } from "@shared/domain/Logger";
import {AWSError, SQS} from "aws-sdk";
import {SendMessageResult} from "aws-sdk/clients/sqs";

export default class SQSEventBus implements EventBus {

    constructor(readonly logger:Logger){
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        this.logger.info("Events to be published:" + events)
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const sqs = new SQS(),
            queueUrl: string = process.env.QUEUE_URL as string
        for (const event of events) {
            this.logger.info("Publishing event: " + event.eventName)
            const params = {
                MessageBody: JSON.stringify(event.toPrimitives()),
                QueueUrl: queueUrl
            };
            this.logger.info("Parameters are: " + JSON.stringify(params))
            await sqs.sendMessage(params, (err: AWSError, data: SendMessageResult) => {
                if (err) {
                    this.logger.error("Error sending message to queue" + err);
                } else {
                    this.logger.info("Success sending message to queue" + data.MessageId);
                }
            }).promise();
        }
        this.logger.info("Events published!")
    }

}
