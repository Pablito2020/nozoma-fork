import ValueObject from '@shared/domain/ValueObject';

export default class NumberVo extends ValueObject<number> {
    toString(): string {
        return this.value.toString();
    }
}
