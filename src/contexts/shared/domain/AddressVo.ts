import StringVo from '@shared/domain/StringVo';
import InvalidAddressError from "@shared/domain/InvalidAddressError";

export default class AddressVo extends StringVo{

    private static MAX_LENGTH = 255;

    constructor(value: string) {
        AddressVo.checkValidity(value)
        super(value);
    }

    private static checkValidity(value: string): void {
        if (value.length > this.MAX_LENGTH)
            throw new InvalidAddressError(`Address can't be longer than ${this.MAX_LENGTH} characters long`);
    }
}
