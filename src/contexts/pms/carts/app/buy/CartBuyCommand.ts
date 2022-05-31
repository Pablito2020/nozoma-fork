import { Command } from '@shared/domain/bus/command/Command';

export default class CartBuyCommand implements Command {
    constructor(
        readonly id: string
    ) {
    }
}
