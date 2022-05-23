import { Command } from "@shared/domain/bus/command/Command";

export default class DeleteCommerceCommand implements Command{
    constructor(
        readonly id: string
    ) {

    }
}