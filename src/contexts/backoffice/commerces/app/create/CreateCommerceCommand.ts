import { Command } from '@shared/domain/bus/command/Command';

export default class CreateCommerceCommand implements Command {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly description: string,
        readonly phone: string,
        readonly address: string,


    ) {
    }
}
