import ValueObject from '@shared/domain/value-object';

export default class StringVo extends ValueObject<string> {
    toString(): string {
        return this.value.toString();
    }
}
