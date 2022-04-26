import ValueObject from '@shared/domain/value-object';

export default class NumberVo extends ValueObject<number> {
    toString(): string {
        return this.value.toString();
    }
}
