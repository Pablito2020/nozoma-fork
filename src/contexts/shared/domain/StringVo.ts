import ValueObject from '@shared/domain/ValueObject';

export default class StringVo extends ValueObject<string> {
    toString(): string {
        return this.value.toString();
    }
}
