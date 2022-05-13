// import ConsoleLogger from "@shared/infra/ConsoleLogger";
import { ContainerBuilder, Reference, TagReference } from "node-dependency-injection";
// import QueryHandlersInformation from "@shared/infra/bus/query/QueryHandlersInformation";
// import InMemoryQueryBus from "@shared/infra/bus/query/InMemoryQueryBus";
import CommandHandlersInformation from "@shared/infra/bus/command/CommandHandlersInformation";
import InMemoryCommandBus from "@shared/infra/bus/command/InMemoryCommandBus";
import LoggerEventBus from "@shared/infra/bus/event/LoggerEventBus";
import ConsoleLogger from "@shared/infra/ConsoleLogger";
import QueryHandlersInformation from "@shared/infra/bus/query/QueryHandlersInformation";
import InMemoryQueryBus from "@shared/infra/bus/query/InMemoryQueryBus";

const DEFINITIONS = {
        Logger: "Shared.Logger",
        DomainEventMapping: "Shared.DomainEventMapping",
        QueryHandlersInfo: "Shared.QueryHandlersInfo",
        CommandHandlersInfo: "Shared.CommandHandlersInfo",
        Tags: {
            EventHandler: "EventHandler",
            CommandHandler: "CommandHandler",
            QueryHandler: "QueryHandler"
        },
        MemoryBuses: {
            CommandBus: "Shared.CommandBus",
            QueryBus: "Shared.QueryBus",
            EventBus: "Shared.EventBus"
        }

    },

    register = (container: ContainerBuilder): void => {
        container.register(DEFINITIONS.Logger, ConsoleLogger);

        // Query bus
        container
            .register(DEFINITIONS.QueryHandlersInfo, QueryHandlersInformation)
            .addArgument(new TagReference(DEFINITIONS.Tags.QueryHandler));

        container
            .register(DEFINITIONS.MemoryBuses.QueryBus, InMemoryQueryBus)
            .addArgument(new Reference(DEFINITIONS.QueryHandlersInfo));

        // CommandBus
        container
            .register(DEFINITIONS.CommandHandlersInfo, CommandHandlersInformation)
            .addArgument(new TagReference(DEFINITIONS.Tags.CommandHandler));

        container
            .register(DEFINITIONS.MemoryBuses.CommandBus, InMemoryCommandBus)
            .addArgument(new Reference(DEFINITIONS.CommandHandlersInfo));

        container.register(DEFINITIONS.MemoryBuses.EventBus, LoggerEventBus);

    };

export { register, DEFINITIONS };
