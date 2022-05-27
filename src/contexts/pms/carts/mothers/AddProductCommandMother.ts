import Cart from "@pms-contexts/carts/domain/Cart";
import Product from "@pms-contexts/products/domain/Product";
import AddCartProductCommand from "@pms-contexts/carts/app/add_product/AddCartProductCommand";

export default class AddProductCommandMother{

    static fromCartAndProduct(cart: Cart, product: Product): AddCartProductCommand {
        return new AddCartProductCommand(
            cart.id.value, product.id.value
        );
    }

}
