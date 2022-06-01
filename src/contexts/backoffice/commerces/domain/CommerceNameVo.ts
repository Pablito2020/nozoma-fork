import StringVo from '@shared/domain/StringVo';
import InvalidCommerceNameError from "@backoffice-contexts/commerces/domain/InvalidCommerceNameError";

export default class CommerceNameVo extends StringVo{
    
    private static MAX_LENGTH = 20;
    
    constructor(value: string) {
        CommerceNameVo.checkValidity(value)
        super(value);
    }

    private static checkValidity(value: string): void {
        if (value.length > this.MAX_LENGTH)
            throw new InvalidCommerceNameError(`Commerce name can't be bigger than ${this.MAX_LENGTH} characters long`);
    }
}
