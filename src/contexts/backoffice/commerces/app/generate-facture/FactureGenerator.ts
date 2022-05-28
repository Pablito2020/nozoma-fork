import Facture from "@backoffice-contexts/commerces/domain/Facture";

export default class FactureGenerator {
    constructor() {
    }

    run(
        cart: Cart
    ): void {
        const facture = new Facture()
        facture.create(cart)
        console.log(facture)
    }
}