/* eslint-disable @typescript-eslint/ban-ts-comment */

import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";

import {ContainerBuilder} from "node-dependency-injection";
import {Logger} from "@shared/domain/Logger";
import { DEFINITIONS, register as sharedRegister } from "../shared/dependencies.di";
import { CREATE_DEFINITIONS, register as createRegister } from "./dependencies.di";
import CartBuyHandler from "@pms-contexts/carts/app/buy/CartBuyHandler";
import CartBuyCommand from "@pms-contexts/carts/app/buy/CartBuyCommand";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import CartIsEmpty from "@pms-contexts/carts/domain/CartIsEmpty";
import CartAlreadyBought from "@pms-contexts/carts/domain/CartAlreadyBought";

const container = new ContainerBuilder();
sharedRegister(container);
createRegister(container);
// eslint-disable-next-line one-var
const logger: Logger = container.get(DEFINITIONS.Logger),
    handlerCreator: CartBuyHandler = container.get(
        CREATE_DEFINITIONS.Handler
    ),
    execute: APIGatewayProxyHandler = async (
        event: APIGatewayProxyEvent,
        _context: Context
    ) => {
        logger.info(`REQUEST PATH: ${event.path}`);
        logger.info(`REQUEST PATH parameters: ${event.pathParameters}`);
        logger.info(`REQUEST BODY: ${event.body}`);
        try {
            const cartId = event?.pathParameters?.id as string,
                createCartProductCommand = new CartBuyCommand(cartId),
                cart = await handlerCreator.handle(createCartProductCommand)
            return {
                statusCode: 200,
                body: JSON.stringify(cart.data.toPrimitives())
            };
        } catch (e) {
            if (e instanceof CartIsEmpty || CartAlreadyBought) {
                return {
                    statusCode: 403,
                    body: (e as Error).message
                };
            }
            if (e instanceof CartDoesNotExist) {
                return {
                    statusCode: 404,
                    body: e.message
                };
            }
            return {
                statusCode: 500,
                body: "Internal server error"
            };
        }
    };

// eslint-disable-next-line one-var
export const handler = middy(execute)
    .use(httpCors());
