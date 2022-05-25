import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import ProductCreator from "@pms-contexts/products/app/create/ProductCreator";
import ProductCreatorHandler from "@pms-contexts/products/app/create/ProductCreatorHandler";
import DynamoProductRepository from "@pms-contexts/products/infra/persistence/dynamodb/DynamoCommerceRepository";

const CREATE_DEFINITIONS = {
        ProductCreator: "ProductCreator",
        ProductRepository: "ProductRepository",
        Handler: "ProductCreatorHandler"
    },

    register = (container: ContainerBuilder): void => {
        container
            .register(CREATE_DEFINITIONS.ProductRepository, DynamoProductRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);

        // creation
        container
            .register(CREATE_DEFINITIONS.ProductCreator, ProductCreator)
            .addArgument(new Reference(CREATE_DEFINITIONS.ProductRepository))
            .addArgument(new Reference(DEFINITIONS.MemoryBuses.EventBus));

        const definition = new Definition(ProductCreatorHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.ProductCreator));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
