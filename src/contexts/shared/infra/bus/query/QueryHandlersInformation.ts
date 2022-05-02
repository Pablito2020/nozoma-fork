import { Query } from "@shared/domain/bus/query/Query";
import { QueryHandler } from "@shared/domain/bus/query/QueryHandler";
import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import QueryNotRegisteredError from "@shared/domain/bus/query/QueryNotRegisteredError";

export default class QueryHandlersInformation {
    private queryHandlersMap: Map<Query, QueryHandler<Query, QueryResponse<any>>>;

    constructor(queryHandlers: Array<QueryHandler<Query, QueryResponse<any>>>) {
        this.queryHandlersMap = this.formatHandlers(queryHandlers);
    }

    public search(query: Query): QueryHandler<Query, QueryResponse<any>> {
        const queryHandler = this.queryHandlersMap.get(query.constructor);

        if (!queryHandler) {
            throw new QueryNotRegisteredError(query);
        }

        return queryHandler;
    }

    // eslint-disable-next-line class-methods-use-this
    private formatHandlers(
        queryHandlers: Array<QueryHandler<Query, QueryResponse<any>>>
    ): Map<Query, QueryHandler<Query, QueryResponse<any>>> {
        const handlersMap = new Map();

        queryHandlers.forEach((queryHandler) => {
            handlersMap.set(queryHandler.subscribedTo(), queryHandler);
        });

        return handlersMap;
    }
}
