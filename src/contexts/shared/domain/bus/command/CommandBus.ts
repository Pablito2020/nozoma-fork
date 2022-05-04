import { Command } from '@shared/domain/bus/command/Command';
import CommandResponse from '@shared/domain/bus/command/CommandResponse';

export interface CommandBus {
    dispatch<T extends CommandResponse<any>>(command: Command): Promise<T>;
}
