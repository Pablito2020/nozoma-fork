import Cart from "@pms-contexts/carts/domain/Cart";
import CreateCartCommand from "@pms-contexts/carts/app/create/CreateCartCommand";

export default class CreateCartCommandMother {
    static fromCart(cart: Cart): CreateCartCommand {
        const {
            id,
            products,
            isBought
        } = cart.toPrimitives();
        return new CreateCartCommand(
            id, products, isBought
        );
    }

}
