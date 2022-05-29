import NumberVo from "@shared/domain/NumberVo";
import InvalidPriceError from "@backoffice-contexts/commerces/domain/InvalidPriceError";

export default class PriceVo extends NumberVo {

    constructor(value: number) {
        super(value);
        if (value < 0)
            throw new InvalidPriceError("Price cannot be negative");
    }
}