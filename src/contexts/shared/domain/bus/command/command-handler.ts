import { Command } from '@shared/domain/bus/command/command';
import CommandResponse from '@shared/domain/bus/command/command-response';

export interface CommandHandler<C extends Command, R extends CommandResponse<any>> {
    handle(command: C): Promise<R>;

    subscribedTo(): Command;
}
