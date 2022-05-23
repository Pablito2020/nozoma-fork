import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import CartCreatorHandler from "@pms-contexts/carts/app/create/CartCreatorHandler";
import CartCreator from "@pms-contexts/carts/app/create/CartCreator";
import DynamoCartRepository from "@pms-contexts/carts/infra/persistence/dynamodb/DynamoCartRepository";

const CREATE_DEFINITIONS = {
        CartCreator: "CartCreator",
        CartRepository: "CartRepository",
        Handler: "CartCreatorHandler"
    },

    register = (container: ContainerBuilder): void => {
        container
            .register(CREATE_DEFINITIONS.CartRepository, DynamoCartRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);

        // creation
        container
            .register(CREATE_DEFINITIONS.CartCreator, CartCreator)
            .addArgument(new Reference(CREATE_DEFINITIONS.CartRepository))
            .addArgument(new Reference(DEFINITIONS.MemoryBuses.EventBus));

        const definition = new Definition(CartCreatorHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.CartCreator));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
