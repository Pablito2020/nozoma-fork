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
            if (e instanceof InvalidArgumentError) {
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
