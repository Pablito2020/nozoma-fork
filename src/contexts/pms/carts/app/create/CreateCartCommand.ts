import { Command } from '@shared/domain/bus/command/Command';
import Product from "@pms-contexts/carts/domain/CartPrimitives";

export default class CreateCartCommand implements Command {
    constructor(
        readonly id: string,
        readonly products: Array<Product> = new Array<Product>(),
        readonly isBought: boolean = false
    ) {
    }
}
