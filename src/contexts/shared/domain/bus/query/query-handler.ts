import { Query } from '@shared/domain/bus/query/query';
import QueryResponse from '@shared/domain/bus/query/query-response';

export interface QueryHandler<C extends Query, R extends QueryResponse<any>> {
    handle(query: C): Promise<R | void>;

    subscribedTo(): Query;
}
