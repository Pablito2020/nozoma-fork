/* eslint-disable @typescript-eslint/ban-ts-comment */

import {Context, SQSEvent} from "aws-lambda";

import {DEFINITIONS, register as sharedRegister} from "../shared/dependencies.di";
import {CREATE_DEFINITIONS, register as createRegister} from "./dependencies.di";
import {ContainerBuilder} from "node-dependency-injection";
import {Logger} from "@shared/domain/Logger";
import ProductCreatorHandler from "@pms-contexts/products/app/create/ProductCreatorHandler";
import CreateProductCommand from "@pms-contexts/products/app/create/CreateProductCommand";
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
export const handler = async (event: SQSEvent, _context: Context) => {
    const messages = event.Records
    for (const message of messages)
        await parseMessageAndExecute(message.body)
};

async function parseMessageAndExecute(productMessage: string) {
    try {
        const {id, commerceId, name, price, description} = JSON.parse(productMessage),
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
}
