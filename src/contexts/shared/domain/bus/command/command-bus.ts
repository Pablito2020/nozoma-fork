import { Command } from '@shared/domain/bus/command/command';
import CommandResponse from '@shared/domain/bus/command/command-response';

export interface CommandBus {
    dispatch<T extends CommandResponse<any>>(command: Command): Promise<T>;
}
