/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import { Query } from "@shared/domain/bus/query/Query";
import { QueryHandler } from "@shared/domain/bus/query/QueryHandler";
import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import InMemoryQueryBus from "@shared/infra/bus/query/InMemoryQueryBus";
import QueryNotRegisteredError from "@shared/domain/bus/query/QueryNotRegisteredError";
import QueryHandlersInformation from "@shared/infra/bus/query/QueryHandlersInformation";

class UnhandledQuery implements Query {
  static QUERY_NAME = "unhandled.query";
}

class HandledQuery implements Query {
  static QUERY_NAME = "handled.query";
}

class MyQueryHandler implements QueryHandler<Query, QueryResponse<any>> {
    subscribedTo(): HandledQuery {
        return HandledQuery;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(_query: HandledQuery): Promise<QueryResponse<any>> {
        return {} as QueryResponse<any>;
    }
}

describe("inMemoryQueryBus", () => {
    it("throws an error if dispatches a query without handler", async () => {
        expect.hasAssertions();

        const unhandledQuery = new UnhandledQuery(),
            queryHandlersInformation = new QueryHandlersInformation([]),
            queryBus = new InMemoryQueryBus(queryHandlersInformation);

        let exception = null;

        try {
            await queryBus.ask(unhandledQuery);
        } catch (error) {
            exception = error;
        }

        expect(exception)
            .toBeInstanceOf(QueryNotRegisteredError);
    });

    // eslint-disable-next-line jest/prefer-expect-assertions,jest/expect-expect
    it("accepts a query with handler", async () => {
        const handledQuery = new HandledQuery(),
            myQueryHandler = new MyQueryHandler(),
            queryHandlersInformation = new QueryHandlersInformation([
                myQueryHandler
            ]),
            queryBus = new InMemoryQueryBus(queryHandlersInformation);

        await queryBus.ask(handledQuery);
    });
});
