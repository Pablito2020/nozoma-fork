import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import { Command } from "@shared/domain/bus/command/Command";
import UuidVo from "@shared/domain/UuidVo";
import CreateCartResponse from "@pms-contexts/carts/app/create/CreateCartResponse";
import CreateCartCommand from "@pms-contexts/carts/app/create/CreateCartCommand";
import CartCreator from "@pms-contexts/carts/app/create/CartCreator";
import ProductListVo from "@pms-contexts/carts/domain/ProductListVo";

export default class CartCreatorHandler implements CommandHandler<CreateCartCommand,
    CreateCartResponse> {
    constructor(private creator: CartCreator) {
    }

    async handle({
        id,
        products,
        isBought
    }: CreateCartCommand): Promise<CreateCartResponse> {
        const response = await this.creator.run(
            new UuidVo(id),
            new ProductListVo(products),
            isBought
        );
        return new CreateCartResponse(response);
    }

    subscribedTo(): Command {
        return CreateCartCommand;
    }

}
