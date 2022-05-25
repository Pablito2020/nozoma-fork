import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import DynamoCartRepository from "@pms-contexts/carts/infra/persistence/dynamodb/DynamoCartRepository";

const CREATE_DEFINITIONS = {
        CartProductCreator: "CartProductCreator",
        CartProductRepository: "CartProductRepository",
        Handler: "CartProductCreatorHandler"
    },

    register = (container: ContainerBuilder): void => {
        container
            .register(CREATE_DEFINITIONS.CartProductRepository, DynamoCartRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);

        // creation
        container
            .register(CREATE_DEFINITIONS.CartProductCreator, CartProductCreator)
            .addArgument(new Reference(CREATE_DEFINITIONS.CartProductRepository))
            .addArgument(new Reference(DEFINITIONS.MemoryBuses.EventBus));

        const definition = new Definition(CartProductCreatorHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.CartProductCreator));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
