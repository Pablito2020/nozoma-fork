import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import CommerceCreator from "@backoffice-contexts/commerces/app/create/CommerceCreator";
import DynamoCommerceRepository from "@backoffice-contexts/commerces/infra/persistence/dynamodb/DynamoCommerceRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../../shared/dependencies.di";
import CommerceCreatorHandler from "@backoffice-contexts/commerces/app/create/CommerceCreatorHandler";

const CREATE_DEFINITIONS = {
        ProductCreator: "CommerceCreator",
        CommerceRepository: "CommerceRepository",
        Handler: "CommerceCreatorHandler"
    },

    register = (container: ContainerBuilder): void => {
        container
            .register(CREATE_DEFINITIONS.CommerceRepository, DynamoCommerceRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("emailIndex");

        // creation
        container
            .register(CREATE_DEFINITIONS.CommerceCreator, CommerceCreator)
            .addArgument(new Reference(CREATE_DEFINITIONS.CommerceRepository))
            .addArgument(new Reference(DEFINITIONS.MemoryBuses.EventBus));

        const definition = new Definition(CommerceCreatorHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.CommerceCreator));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
