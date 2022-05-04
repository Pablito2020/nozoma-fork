import Aggregate from '@shared/domain/Aggregate';

export default class QueryResponse<T extends Aggregate> {
    readonly data: T;

    constructor(data: T) {
        this.data = data;
    }
}
