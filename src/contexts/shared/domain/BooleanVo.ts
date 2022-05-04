import ValueObject from '@shared/domain/ValueObject';

export default class BooleanVo extends ValueObject<boolean> {
    toString(): string {
        return this.value.toString();
    }
}
