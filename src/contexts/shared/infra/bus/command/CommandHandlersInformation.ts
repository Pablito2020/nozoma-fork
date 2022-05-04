import { Command } from "@shared/domain/bus/command/Command";
import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import CommandResponse from "@shared/domain/bus/command/CommandResponse";
import CommandNotRegisteredError from "@shared/domain/bus/command/CommandNotRegistered";

export default class CommandHandlersInformation {
    private commandHandlersMap: Map<Command, CommandHandler<Command, CommandResponse<any>>>;

    constructor(commandHandlers: Array<CommandHandler<Command, CommandResponse<any>>>) {
        this.commandHandlersMap = this.formatHandlers(commandHandlers);
    }

    public search(command: Command): CommandHandler<Command, CommandResponse<any>> {
        const commandHandler = this.commandHandlersMap.get(command.constructor);

        if (!commandHandler) {
            throw new CommandNotRegisteredError(command);
        }

        return commandHandler;
    }

    // eslint-disable-next-line class-methods-use-this
    private formatHandlers(
        commandHandlers: Array<CommandHandler<Command, CommandResponse<any>>>
    ): Map<Command, CommandHandler<Command, CommandResponse<any>>> {
        const handlersMap = new Map();

        commandHandlers.forEach((commandHandler) => {
            handlersMap.set(commandHandler.subscribedTo(), commandHandler);
        });

        return handlersMap;
    }
}
