import Facture from "@backoffice-contexts/commerces/domain/Facture";
import Cart from "@backoffice-contexts/commerces/domain/CartProduct";

export default class FactureGenerator {
    constructor() {
    }

    run(
        cart: Cart
    ): void {
        const facture = new Facture(cart)
        console.log(facture)
    }
}