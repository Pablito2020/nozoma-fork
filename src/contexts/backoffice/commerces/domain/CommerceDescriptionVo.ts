import StringVo from '@shared/domain/StringVo';
import InvalidCommerceDescriptionError from "@backoffice-contexts/commerces/domain/InvalidCommerceDescriptionError";

export default class CommerceDescriptionVo extends StringVo{

    private static MAX_LENGTH = 255;

    constructor(value: string) {
        CommerceDescriptionVo.checkValidity(value)
        super(value);
    }

    private static checkValidity(value: string): void {
        if (value.length > this.MAX_LENGTH)
            throw new InvalidCommerceDescriptionError(`Commerce description can't be longer than ${this.MAX_LENGTH} characters long`);
    }
}
