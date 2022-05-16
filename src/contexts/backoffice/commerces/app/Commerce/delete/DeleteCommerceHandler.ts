import UuidVo from "@shared/domain/UuidVo";
import {CommandHandler} from "@shared/domain/bus/command/CommandHandler";
import DeleteCommerceCommand from "@backoffice-contexts/commerces/app/Commerce/delete/DeleteCommerceCommand";
import DeleteCommerceResponse from "@backoffice-contexts/commerces/app/Commerce/delete/DeleteCommerceResponse";
import CommerceDeletor from "@backoffice-contexts/commerces/app/Commerce/delete/CommerceDeletor";
import {Command} from "@shared/domain/bus/command/Command";

export default class CommerceDeletorHandler implements CommandHandler<DeleteCommerceCommand, DeleteCommerceResponse> {
    constructor(private deletor: CommerceDeletor) {
    }

    async handle({
        id
    }: DeleteCommerceCommand): Promise<void> {
        await this.deletor.run(
            new UuidVo(id)
        );
    }

    subscribedTo(): Command {
        return DeleteCommerceCommand;
    }

}
