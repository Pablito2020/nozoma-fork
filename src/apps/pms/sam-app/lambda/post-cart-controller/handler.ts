/* eslint-disable @typescript-eslint/ban-ts-comment */

import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";

import {DEFINITIONS, register as sharedRegister} from "../shared/dependencies.di";
import {CREATE_DEFINITIONS, register as createRegister} from "./dependencies.di";
import {ContainerBuilder} from "node-dependency-injection";
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
        // eslint-disable-next-line one-var
        const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
        try {
            const {
                    cartId
                } = JSON.parse(event.body as string),
                createCartCommand = new CreateCartCommand(cartId),
                cart = await handlerCreator.handle(createCartCommand);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            // eslint-disable-next-line one-var
            const params = {
                MessageBody: JSON.stringify(cart.data.toPrimitives()),
                QueueUrl: process.env.QUEUE_URL
            };
            sqs.sendMessage(params, (err: AWSError, data: SendMessageResult) => {
                if (err) {
                    console.log("Error sending message to queue", err);
                } else {
                    console.log("Success sending message to queue", data.MessageId);
                }
            });
            return {
                statusCode: 200,
                body: JSON.stringify(cart.data.toPrimitives())
            };
        } catch (e) {
            logger.error((e as Error).message);
            if (e instanceof InvalidArgumentError ) {
                return {
                    statusCode: 400,
                    body: e.message
                }
            }
            if (e instanceof (AlreadyExists)) {
                return {
                    statusCode: 403,
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
