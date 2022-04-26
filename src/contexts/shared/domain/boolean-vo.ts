import ValueObject from '@shared/domain/value-object';

export default class BooleanVo extends ValueObject<boolean> {
    toString(): string {
        return this.value.toString();
    }
}
