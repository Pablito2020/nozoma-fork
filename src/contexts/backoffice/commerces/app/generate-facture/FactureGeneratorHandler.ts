import FactureGenerator from "@backoffice-contexts/commerces/app/generate-facture/FactureGenerator";
import CartProduct from "@backoffice-contexts/commerces/domain/CartProduct";

export default class FactureGeneratorHandler {
    constructor(private generator: FactureGenerator) {
    }

    async handle() {
        let cart = new
        this.generator.run(cart);
    }
}