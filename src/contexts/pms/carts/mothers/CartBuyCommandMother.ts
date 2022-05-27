import CartBuyCommand from "@pms-contexts/carts/app/buy/CartBuyCommand";
import Cart from "@pms-contexts/carts/domain/Cart";

export default class CartBuyCommandMother {
    static create(cart: Cart): CartBuyCommand {
        return new CartBuyCommand(cart.id.value);
    }
}
