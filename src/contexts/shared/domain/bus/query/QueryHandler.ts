import { Query } from '@shared/domain/bus/query/Query';
import QueryResponse from '@shared/domain/bus/query/QueryResponse';

export interface QueryHandler<C extends Query, R extends QueryResponse<any>> {
    handle(query: C): Promise<R | void>;

    subscribedTo(): Query;
}
