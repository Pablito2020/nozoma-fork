import { Command } from '@shared/domain/bus/command/Command';

export default class GenerateFactureCommand implements Command{
    constructor(
        readonly cart: Cart
    ) {
    }
}