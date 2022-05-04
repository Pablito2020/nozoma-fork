import { Command } from '@shared/domain/bus/command/Command';
import CommandResponse from '@shared/domain/bus/command/CommandResponse';

export interface CommandHandler<C extends Command, R extends CommandResponse<any>> {
    handle(command: C): Promise<R> | Promise<void>;

    subscribedTo(): Command;
}
