import { Command } from '@shared/domain/bus/command/Command';
import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";

export default class CreateCartCommand implements Command {
    constructor(
        readonly id: string,
        readonly products: Array<CartProductPrimitives> = new Array<CartProductPrimitives>(),
        readonly isBought: boolean = false
    ) {
    }
}
