import Facture from "@backoffice-contexts/commerces/domain/Facture";
<<<<<<< HEAD
import Cart from "@backoffice-contexts/commerces/domain/CartProduct";
=======
>>>>>>> patrickcart

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