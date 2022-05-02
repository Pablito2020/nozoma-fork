import { CommandBus } from "@shared/domain/bus/command/CommandBus";
import CommandHandlersInformation from "@shared/infra/bus/command/CommandHandlersInformation";
import CommandResponse from "@shared/domain/bus/command/CommandResponse";
import { Command } from "@shared/domain/bus/command/Command";

export default class InMemoryCommandBus implements CommandBus {
    private commandHandlersInformation: CommandHandlersInformation;

    constructor(commandHandlersInformation: CommandHandlersInformation) {
        this.commandHandlersInformation = commandHandlersInformation;
    }

    dispatch<R extends CommandResponse<any>>(command: Command): Promise<R> {
        const handler = this.commandHandlersInformation.search(command);

        return handler.handle(command) as Promise<R>;

    }
}
