/* eslint-disable @typescript-eslint/ban-ts-comment */

import {APIGatewayProxyEvent, APIGatewayProxyHandler, Context} from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";

import {ContainerBuilder} from "node-dependency-injection";
import {Logger} from "@shared/domain/Logger";
import { DEFINITIONS, register as sharedRegister } from "../shared/dependencies.di";
import { CREATE_DEFINITIONS, register as createRegister } from "./dependencies.di";
import AddCartProductCommand from "../../../../../contexts/pms/carts/app/add_product/AddCartProductCommand";
import CartProductAdderHandler from "../../../../../contexts/pms/carts/app/add_product/CartProductAdderHandler";

const container = new ContainerBuilder();
sharedRegister(container);
createRegister(container);
// eslint-disable-next-line one-var
const logger: Logger = container.get(DEFINITIONS.Logger),
    handlerCreator: CartProductAdderHandler = container.get(
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
                {
                    productId
                } = JSON.parse(event.body as string);
            // eslint-disable-next-line one-var
            const createCartProductCommand = new AddCartProductCommand(cartId, productId),
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
