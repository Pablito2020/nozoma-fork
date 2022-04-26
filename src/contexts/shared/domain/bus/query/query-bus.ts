import { Query } from '@shared/domain/bus/query/query';
import QueryResponse from '@shared/domain/bus/query/query-response';

export interface QueryBus {
    ask<T extends QueryResponse<any>>(query: Query): Promise<T>;
}
