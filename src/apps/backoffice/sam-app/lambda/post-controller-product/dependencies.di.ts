import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import ProductCreator from "@backoffice-contexts/products/app/create/ProductCreator";
import DynamoProductRepository from "@backoffice-contexts/products/infra/persistence/dynamodb/DynamoProductRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import ProductCreatorHandler from "@backoffice-contexts/products/app/create/ProductCreatorHandler";
import AWSEventBus from "@shared/infra/bus/event/AWSEventBus";

const CREATE_DEFINITIONS = {
        ProductCreator: "ProductCreator",
        ProductRepository: "ProductRepository",
        Handler: "ProductCreatorHandler",
        EventBus: "AWSEventBus"
    },

    register = (container: ContainerBuilder): void => {

        container.register(CREATE_DEFINITIONS.EventBus, AWSEventBus)
            .addArgument(new Reference(DEFINITIONS.Logger))

        container
            .register(CREATE_DEFINITIONS.ProductRepository, DynamoProductRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("productId");

        // creation
        container
            .register(CREATE_DEFINITIONS.ProductCreator, ProductCreator)
            .addArgument(new Reference(CREATE_DEFINITIONS.ProductRepository))
            .addArgument(new Reference(CREATE_DEFINITIONS.EventBus));
        
        const definition = new Definition(ProductCreatorHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.ProductCreator));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
