import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import ProductCreator from "@backoffice-contexts/products/app/create/ProductCreator";
import DynamoProductRepository from "@backoffice-contexts/products/infra/persistence/dynamodb/DynamoProductRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../../shared/dependencies.di";
import ProductCreatorHandler from "@backoffice-contexts/products/app/create/ProductCreatorHandler";
import SQSEventBus from "@shared/infra/bus/event/SQSEventBus";
import DynamoCommerceRepository
    from "@backoffice-contexts/commerces/infra/persistence/dynamodb/DynamoCommerceRepository";

const CREATE_DEFINITIONS = {
        ProductCreator: "ProductCreator",
        ProductRepository: "ProductRepository",
        CommerceRepository: "CommerceRepository",
        Handler: "ProductCreatorHandler",
        EventBus: "SqsEventBus"
    },

    register = (container: ContainerBuilder): void => {

        container.register(CREATE_DEFINITIONS.EventBus, SQSEventBus)
            .addArgument(new Reference(DEFINITIONS.Logger))

        container
            .register(CREATE_DEFINITIONS.ProductRepository, DynamoProductRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("productId");

        container
            .register(CREATE_DEFINITIONS.CommerceRepository, DynamoCommerceRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("emailIndex");

        // creation
        container
            .register(CREATE_DEFINITIONS.ProductCreator, ProductCreator)
            .addArgument(new Reference(CREATE_DEFINITIONS.ProductRepository))
            .addArgument(new Reference(CREATE_DEFINITIONS.EventBus))
            .addArgument(new Reference(CREATE_DEFINITIONS.CommerceRepository));
        
        const definition = new Definition(ProductCreatorHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.ProductCreator));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
