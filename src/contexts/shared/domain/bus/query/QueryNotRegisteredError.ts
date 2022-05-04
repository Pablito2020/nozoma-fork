import { Query } from '@shared/domain/bus/query/Query';

export default class QueryNotRegisteredError extends Error {
    constructor(query: Query) {
        super(
            `The query <${query.constructor.name}> hasn't a query handler associated`
        );
    }
}
