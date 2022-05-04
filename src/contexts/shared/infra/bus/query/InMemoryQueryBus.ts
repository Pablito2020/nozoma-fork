import { QueryBus } from "@shared/domain/bus/query/QueryBus";
import QueryHandlersInformation from "@shared/infra/bus/query/QueryHandlersInformation";

import { Query } from "@shared/domain/bus/query/Query";
import QueryResponse from "@shared/domain/bus/query/QueryResponse";

export default class InMemoryQueryBus implements QueryBus {
    private queryHandlersInformation: QueryHandlersInformation;

    constructor(queryHandlersInformation: QueryHandlersInformation) {
        this.queryHandlersInformation = queryHandlersInformation;
    }

    ask<R extends QueryResponse<any>>(query: Query): Promise<R> {
        const handler = this.queryHandlersInformation.search(query);

        return handler.handle(query) as Promise<R>;
    }
}
