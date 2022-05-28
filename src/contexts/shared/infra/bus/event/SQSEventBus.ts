import { DomainEvent } from "@shared/domain/bus/event/DomainEvent";
import { EventBus } from "@shared/domain/bus/event/EventBus";
import { Logger } from "@shared/domain/Logger";
import {AWSError} from "aws-sdk";
import {SendMessageResult} from "aws-sdk/clients/sqs";

export default class SQSEventBus implements EventBus {

    constructor(readonly logger:Logger){
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        this.logger.info("Events to be published:" + events)
        const AWS = require('aws-sdk');
        AWS.config.update({region: 'REGION'});
        const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        for (const event of events) {
            const params = {
                MessageBody: JSON.stringify(event.toPrimitives()),
                QueueUrl: process.env.QUEUE_URL
            };
            await sqs.sendMessage(params, (err: AWSError, data: SendMessageResult) => {
                if (err) {
                    this.logger.error("Error sending message to queue" + err);
                } else {
                    this.logger.info("Success sending message to queue" + data.MessageId);
                }
            }).promise();
        }
        this.logger.info("Events published with SQS")
    }

}
