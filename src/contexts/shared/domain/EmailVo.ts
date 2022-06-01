import StringVo from '@shared/domain/StringVo';
import InvalidEmailError from "@shared/domain/InvalidEmailError";

export default class EmailVo extends StringVo{

    private static AT_CHAR = '@';

    constructor(value: string) {
        EmailVo.checkValidity(value)
        super(value);
    }

    private static checkValidity(value: string): void {
        if (!value.includes(this.AT_CHAR))
            throw new InvalidEmailError(`Email must contain ${this.AT_CHAR}`);
    }
}
