import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import { Command } from "@shared/domain/bus/command/Command";
import UuidVo from "@shared/domain/UuidVo";
import CartBuyCommand from "@pms-contexts/carts/app/buy/CartBuyCommand";
import CartBuyResponse from "@pms-contexts/carts/app/buy/CartBuyResponse";
import CartBuy from "@pms-contexts/carts/app/buy/CartBuy";

export default class CartBuyHandler implements CommandHandler<CartBuyCommand, CartBuyResponse> {

    constructor(private buyer: CartBuy) {
    }

    async handle({
        id,
    }: CartBuyCommand): Promise<CartBuyResponse> {
        const response = await this.buyer.run(
            new UuidVo(id),
        );
        return new CartBuyResponse(response);
    }

    subscribedTo(): Command {
        return CartBuyCommand;
    }

}
