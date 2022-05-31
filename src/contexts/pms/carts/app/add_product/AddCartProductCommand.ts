import { Command } from '@shared/domain/bus/command/Command';

export default class AddCartProductCommand implements Command {
    constructor(
        readonly cartId: string,
        readonly productId: string
    ) {
    }
}
