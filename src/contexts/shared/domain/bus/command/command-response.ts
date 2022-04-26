import Aggregate from '@shared/domain/aggregate';

export default class CommandResponse<T extends Aggregate> {
    readonly data: T;

    constructor(data: T) {
        this.data = data;
    }
}
