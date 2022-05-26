/* eslint-disable @typescript-eslint/ban-ts-comment */

import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";

import { DEFINITIONS, register as sharedRegister } from "../shared/dependencies.di";
import { CREATE_DEFINITIONS, register as createRegister } from "./dependencies.di";
import { ContainerBuilder } from "node-dependency-injection";
import CartCreatorHandler from "@pms-contexts/carts/app/create/CartCreatorHandler";
import {Logger} from "@shared/domain/Logger";
import CreateCartCommand from "@pms-contexts/carts/app/create/CreateCartCommand";
import InvalidArgumentError from "@shared/domain/InvalidArgumentError";
import AlreadyExists from "@shared/domain/AlreadyExists";
import {AWSError} from "aws-sdk";
import {SendMessageResult} from "aws-sdk/clients/sqs";

const container = new ContainerBuilder();
sharedRegister(container);
createRegister(container);
// eslint-disable-next-line one-var
const logger: Logger = container.get(
    DEFINITIONS.Logger
),
    handlerCreator: CartCreatorHandler = container.get(
        CREATE_DEFINITIONS.Handler
    ),
    execute: APIGatewayProxyHandler = async (
        event: APIGatewayProxyEvent,
        _context: Context
    ) => {
        logger.info(`REQUEST PATH: ${event.path}`);
        logger.info(`REQUEST BODY: ${event.body}`);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var AWS = require('aws-sdk');
        AWS.config.update({region: 'REGION'});
        const sqs = new AWS.SQS({apiVersion: '2012-11-05'}),
            params = {
            // Remove DelaySeconds parameter and value for FIFO queues
                DelaySeconds: 10,
                MessageAttributes: {
                    "Title": {
                        DataType: "String",
                        StringValue: "The Whistler"
                    },
                    "Author": {
                        DataType: "String",
                        StringValue: "John Grisham"
                    },
                    "WeeksOn": {
                        DataType: "Number",
                        StringValue: "6"
                    }
                },
                MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
                // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
                // MessageGroupId: "Group1",  // Required for FIFO queues
                QueueUrl: "https://sqs.eu-west-1.amazonaws.com/327832251428/backoffice-joel-patrick-event-cart-updated-sqs"
            };

        sqs.sendMessage(params, function(err:AWSError, data: SendMessageResult) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
            }
        });

        try {
            const {
                    cartId
                } = JSON.parse(event.body as string),
                createCartCommand = new CreateCartCommand(cartId),
                cart = await handlerCreator.handle(createCartCommand);
            return {
                statusCode: 200,
                body: JSON.stringify(cart.data.toPrimitives())
            };
        } catch (e) {
            logger.error((e as Error).message);
            if (e instanceof (InvalidArgumentError || AlreadyExists)) {
                return {
                    statusCode: 400,
                    body: e.message
                };
            }
            return {
                statusCode: 500,
                body: (e as Error).message
            };
        }

    };

// eslint-disable-next-line one-var
export const handler = middy(execute)
    .use(httpCors());
