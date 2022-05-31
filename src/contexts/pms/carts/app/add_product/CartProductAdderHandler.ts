import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import { Command } from "@shared/domain/bus/command/Command";
import UuidVo from "@shared/domain/UuidVo";
import AddCartProductCommand from "@pms-contexts/carts/app/add_product/AddCartProductCommand";
import ModifiedCartProductsResponse from "@pms-contexts/carts/app/add_product/ModifiedCartProductsResponse";
import CartProductAdder from "@pms-contexts/carts/app/add_product/CartProductAdder";

export default class CartProductAdderHandler implements CommandHandler<AddCartProductCommand, ModifiedCartProductsResponse> {
    constructor(private creator: CartProductAdder) {
    }

    async handle({
        cartId,
        productId
    }: AddCartProductCommand): Promise<ModifiedCartProductsResponse> {
        const response = await this.creator.run(
            new UuidVo(cartId),
            new UuidVo(productId),
        );
        return new ModifiedCartProductsResponse(response);
    }

    subscribedTo(): Command {
        return AddCartProductCommand;
    }

}
