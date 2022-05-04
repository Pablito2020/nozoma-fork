import CommerceGetterHandler from "@backoffice-contexts/commerces/app/get/CommerceGetterHandler";
import {ContainerBuilder, Definition, Reference} from "node-dependency-injection";
import {DEFINITIONS} from "../shared/dependencies.di";
import CommerceGetter from "@backoffice-contexts/commerces/app/get/CommerceGetter";
import DynamoCommerceRepository from "@backoffice-contexts/commerces/infra/persistence/dynamodb/DynamoCommerceRepository";
import {DocumentClient} from "aws-sdk/clients/dynamodb";

const GETTER_DEFINITIONS = {
        CommerceGetter: "CommerceGetter",
        CommerceRepository: "CommerceRepository",
        Handler: "CommerceGetterHandler"
    },


    register = (container: ContainerBuilder): void => {
        container.register(GETTER_DEFINITIONS.CommerceRepository, DynamoCommerceRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("emailIndex");

        container.register(GETTER_DEFINITIONS.CommerceGetter, CommerceGetter)
            .addArgument(new Reference(GETTER_DEFINITIONS.CommerceRepository))
            .addArgument(new Reference(DEFINITIONS.MemoryBuses.EventBus));


        const definition = new Definition(CommerceGetterHandler);
        definition.addArgument(new Reference(GETTER_DEFINITIONS.CommerceGetter));
        definition.addTag(DEFINITIONS.Tags.QueryHandler);
        container.setDefinition(GETTER_DEFINITIONS.Handler, definition);
    };

export {register, GETTER_DEFINITIONS};