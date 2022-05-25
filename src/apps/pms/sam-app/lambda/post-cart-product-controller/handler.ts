/* eslint-disable @typescript-eslint/ban-ts-comment */

import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";

import {ContainerBuilder} from "node-dependency-injection";
import {Logger} from "@shared/domain/Logger";
import {SEARCHER_DEFINITIONS} from "./dependencies.di";

const container = new ContainerBuilder();
sharedRegister(container);
createRegister(container);
// eslint-disable-next-line one-var
const logger: Logger = container.get(DEFINITIONS.Logger),
    handlerCreator: CartProductCreatorHandler = container.get(
        SEARCHER_DEFINITIONS.Handler
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
                {
                    productId
                } = JSON.parse(event.body as string),
                createCartProductCommand = new CreateCartProductCommand(cartId, productId),
                cart = await handlerCreator.handle(createCartProductCommand)
            return {
                statusCode: 200,
                body: JSON.stringify(cart.data.toPrimitives())
            };
        } catch (e) {
            return {
                statusCode: 500,
                body: "Internal server error"
            };
        }
    };

// eslint-disable-next-line one-var
export const handler = middy(execute)
    .use(httpCors());
