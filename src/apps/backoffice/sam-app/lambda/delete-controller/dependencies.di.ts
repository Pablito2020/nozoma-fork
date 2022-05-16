import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import DynamoCommerceRepository from "@backoffice-contexts/commerces/infra/persistence/dynamodb/DynamoCommerceRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import CommerceDeletor from "@backoffice-contexts/commerces/app/delete/CommerceDeletor";
import CommerceDeletorHandler from "@backoffice-contexts/commerces/app/delete/DeleteCommerceHandler";

const DELETE_DEFINITIONS = {
        CommerceDeletor: "CommerceDeletor",
        CommerceRepository: "CommerceRepository",
        Handler: "DeleteCommerceHandler"
    },

    register = (container: ContainerBuilder): void => {
        container
            .register(DELETE_DEFINITIONS.CommerceRepository, DynamoCommerceRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("emailIndex");

        // delete
        container
            .register(DELETE_DEFINITIONS.CommerceDeletor, CommerceDeletor)
            .addArgument(new Reference(DELETE_DEFINITIONS.CommerceRepository))
            .addArgument(new Reference(DEFINITIONS.MemoryBuses.EventBus));

        const definition = new Definition(CommerceDeletorHandler);
        definition.addArgument(new Reference(DELETE_DEFINITIONS.CommerceDeletor));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(DELETE_DEFINITIONS.Handler, definition);

    };

export { register, DELETE_DEFINITIONS };