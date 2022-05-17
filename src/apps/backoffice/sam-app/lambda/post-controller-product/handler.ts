/* eslint-disable @typescript-eslint/ban-ts-comment */

import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import middy from "@middy/core";
import httpCors from "@middy/http-cors";

import { DEFINITIONS, register as sharedRegister } from "../shared/dependencies.di";
import { CREATE_DEFINITIONS, register as createRegister } from "./dependencies.di";
import { ContainerBuilder } from "node-dependency-injection";
import { Logger } from "@shared/domain/Logger";
import AlreadyExists from "@shared/domain/AlreadyExists";
import ProductCreatorHandler from "@backoffice-contexts/products/app/create/ProductCreatorHandler";
import * as console from "console";
import CreateProductCommand from "@backoffice-contexts/products/app/create/CreateProductCommand";

const container = new ContainerBuilder();
sharedRegister(container);
createRegister(container);
// eslint-disable-next-line one-var
const logger: Logger = container.get(DEFINITIONS.Logger),
    handlerCreator: ProductCreatorHandler = container.get(
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
                    id,
                    commerceId,
                    name,
                    price,
                    description,
                } = JSON.parse(event.body as string),
                createProductCommand = new CreateProductCommand(
                    id, commerceId, name, price, description
                ),
                product = await handlerCreator.handle(createProductCommand);

            return {
                statusCode: 200,
                body: JSON.stringify(product.data.toPrimitives())
            };
        } catch (e) {
            console.info(e);
            if (e instanceof AlreadyExists) {
                return {
                    statusCode: 400,
                    body: e.message
                };
            } else {
                return {
                    statusCode: 500,
                    body: "Internal server error"
                };
            }
        }

    };

// eslint-disable-next-line one-var
export const handler = middy(execute)
    .use(httpCors());
