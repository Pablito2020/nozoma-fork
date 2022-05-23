/* eslint-disable @typescript-eslint/ban-ts-comment */

import {Context, EventBridgeEvent} from "aws-lambda";

import { DEFINITIONS, register as sharedRegister } from "../shared/dependencies.di";
import { CREATE_DEFINITIONS, register as createRegister } from "./dependencies.di";
import { ContainerBuilder } from "node-dependency-injection";
import { Logger } from "@shared/domain/Logger";
import ProductCreatorHandler from "@pms-contexts/products/app/create/ProductCreatorHandler";
import CreateProductCommand from "@pms-contexts/products/app/create/CreateProductCommand";
import {ProductPrimitives} from "@pms-contexts/products/domain/ProductPrimitives";
import InvalidPriceError from "@pms-contexts/products/domain/InvalidPriceError";

const container = new ContainerBuilder();
sharedRegister(container);
createRegister(container);

// eslint-disable-next-line one-var
const logger: Logger = container.get(
    DEFINITIONS.Logger
),
    handlerCreator: ProductCreatorHandler = container.get(
        CREATE_DEFINITIONS.Handler
    );

// eslint-disable-next-line one-var
export const handler = async (event: EventBridgeEvent<string, ProductPrimitives>, _context: Context) => {
    logger.info(`Event Bridge event received{ id: ${event.id} and detail: ${event.detail}}`);
    // eslint-disable-next-line one-var
    try {
        const id = event.detail.id,
            commerceId = event.detail.commerceId,
            name = event.detail.name,
            price = event.detail.price,
            description = event.detail.description,
            createProductCommand = new CreateProductCommand(id, commerceId, name, price, description),
            product = await handlerCreator.handle(createProductCommand);
        logger.info(`Product created: ${JSON.stringify(product)}`);
    } catch (error) {
        if (error instanceof InvalidPriceError) {
            logger.error(`Invalid price: ${error.message}`);
        } else {
            logger.error(`Not known error`);
        }
    }
};
