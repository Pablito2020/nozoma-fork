import { Logger } from "@shared/domain/Logger";
import {SQS} from "aws-sdk"
import { Context } from "aws-lambda";

export default class sqs {
    
    private sqs = new SQS
    
    constructor(readonly logger:Logger){
    }
    
    sendMessage = async (messageBody: string, messageAttributes = {},
        queueName: string, context: Context) => {
        const queueUrl = this.getQueueUrl(queueName, context)
    
        const data = await this.sqs.sendMessage({
          QueueUrl: queueUrl,
          MessageBody: messageBody,
          MessageAttributes: messageAttributes
        }).promise();
    
        console.log(`Message ${data.MessageId} placed in the Queue: ${queueName}`);
    
        return data;
      }
    private getQueueUrl = (queueName: string, context: Context): string => {
        const region = context.invokedFunctionArn.split(':')[3];
        const accountId = context.invokedFunctionArn.split(':')[4];
    
        return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`
    }
}