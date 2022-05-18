import { Command } from '@shared/domain/bus/command/Command';

export default class CreateProductCommand implements Command {
    constructor(
        readonly id: string,
        readonly commerceId: string,
        readonly name: string,
        readonly price: number,
        readonly description: string,
    ) {
    }
}
