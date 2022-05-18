import CommerceSearcherHandler from "@backoffice-contexts/commerces/app/get/CommerceSearcherHandler";
import {ContainerBuilder, Definition, Reference} from "node-dependency-injection";
import {DEFINITIONS} from "../../shared/dependencies.di";
import CommerceSearcher from "@backoffice-contexts/commerces/app/get/CommerceSearcher";
import DynamoCommerceRepository from "@backoffice-contexts/commerces/infra/persistence/dynamodb/DynamoCommerceRepository";
import {DocumentClient} from "aws-sdk/clients/dynamodb";

const SEARCHER_DEFINITIONS = {
        CommerceSearcher: "CommerceSearcher",
        CommerceRepository: "CommerceRepository",
        Handler: "CommerceSearcherHandler"
    },


    register = (container: ContainerBuilder): void => {
        container.register(SEARCHER_DEFINITIONS.CommerceRepository, DynamoCommerceRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("emailIndex");

        container.register(SEARCHER_DEFINITIONS.CommerceSearcher, CommerceSearcher)
            .addArgument(new Reference(SEARCHER_DEFINITIONS.CommerceRepository))
            .addArgument(new Reference(DEFINITIONS.MemoryBuses.EventBus));


        const definition = new Definition(CommerceSearcherHandler);
        definition.addArgument(new Reference(SEARCHER_DEFINITIONS.CommerceSearcher));
        definition.addTag(DEFINITIONS.Tags.QueryHandler);
        container.setDefinition(SEARCHER_DEFINITIONS.Handler, definition);
    };

export {register, SEARCHER_DEFINITIONS};