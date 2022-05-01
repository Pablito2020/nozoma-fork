import { Query } from '@shared/domain/bus/query/Query';
import QueryResponse from '@shared/domain/bus/query/QueryResponse';

export interface QueryBus {
    ask<T extends QueryResponse<any>>(query: Query): Promise<T>;
}
