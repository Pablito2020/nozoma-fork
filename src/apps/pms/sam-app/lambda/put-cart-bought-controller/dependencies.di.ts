import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import DynamoCartRepository from "@pms-contexts/carts/infra/persistence/dynamodb/DynamoCartRepository";
import CartBuy from "@pms-contexts/carts/app/buy/CartBuy";
import CartBuyHandler from "@pms-contexts/carts/app/buy/CartBuyHandler";
import SQSEventBus from "@pms-contexts/carts/infra/bus/SqsEventBus";

const CREATE_DEFINITIONS = {
        CartBuy: "CartBuy",
        CartRepository: "CartRepository",
        Handler: "CartBuyHandler",
        EventBus: "SqsEventBus"
    },

    register = (container: ContainerBuilder): void => {
        container
            .register(CREATE_DEFINITIONS.CartRepository, DynamoCartRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);

        container
            .register(CREATE_DEFINITIONS.EventBus, SQSEventBus)
            .addArgument(new Reference(DEFINITIONS.Logger));

        // creation
        container
            .register(CREATE_DEFINITIONS.CartBuy, CartBuy)
            .addArgument(new Reference(CREATE_DEFINITIONS.CartRepository))
            .addArgument(new Reference(CREATE_DEFINITIONS.EventBus));

        const definition = new Definition(CartBuyHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.CartBuy));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
