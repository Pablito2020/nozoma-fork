import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import CreateCommerceCommand from "@backoffice-contexts/commerces/app/Commerce/create/CreateCommerceCommand";
import CreateCommerceResponse from "@backoffice-contexts/commerces/app/Commerce/create/CreateCommerceResponse";
import { Command } from "@shared/domain/bus/command/Command";
import CommerceCreator from "@backoffice-contexts/commerces/app/Commerce/create/CommerceCreator";
import UuidVo from "@shared/domain/UuidVo";
import CommerceNameVo from "@backoffice-contexts/commerces/domain/Commerce/CommerceNameVo";
import EmailVo from "@shared/domain/EmailVo";
import CommerceDescriptionVo from "@backoffice-contexts/commerces/domain/Commerce/CommerceDescriptionVo";
import PhoneVo from "@shared/domain/PhoneVo";
import AddressVo from "@shared/domain/AddressVo";

export default class CommerceCreatorHandler implements CommandHandler<CreateCommerceCommand,
    CreateCommerceResponse> {
    constructor(private creator: CommerceCreator) {
    }

    async handle({
        id,
        description,
        email,
        phone,
        name,
        address
    }: CreateCommerceCommand): Promise<CreateCommerceResponse> {
        const response = await this.creator.run(
            new UuidVo(id),
            new CommerceNameVo(name),
            new EmailVo(email),
            new CommerceDescriptionVo(description),
            new PhoneVo(phone),
            new AddressVo(address)
        );
        return new CreateCommerceResponse(response);
    }

    subscribedTo(): Command {
        return CreateCommerceCommand;
    }

}
