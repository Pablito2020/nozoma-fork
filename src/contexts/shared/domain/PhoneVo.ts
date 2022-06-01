import StringVo from '@shared/domain/StringVo';
import InvalidPhoneError from '@shared/domain/InvalidPhoneError';

export default class PhoneVo extends StringVo {

    private static REQUIRED_LENGTH = 12;

    constructor(value: string) {
        PhoneVo.checkValidity(value)
        super(value);
    }

    private static checkValidity(value: string): void {
        if (value.length != this.REQUIRED_LENGTH)
            throw new InvalidPhoneError(`Phone must be ${this.REQUIRED_LENGTH} characters long`);
    }
}
