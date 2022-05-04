export default abstract class ValueObject<T> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    equalsTo(value: ValueObject<T>): boolean {
        return this.value === value.value;
    }

    abstract toString(): string;
}
