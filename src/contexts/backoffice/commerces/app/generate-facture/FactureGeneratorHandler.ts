<<<<<<< HEAD
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
=======
import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import { Command } from "@shared/domain/bus/command/Command";
import FactureGenerator from "@backoffice-contexts/commerces/app/generate-facture/FactureGenerator";
import GenerateFactureCommand from "@backoffice-contexts/commerces/app/generate-facture/GenerateFactureCommand";

export default class FactureGeneratorHandler implements CommandHandler<GenerateFactureCommand, any> {
    constructor(private generator: FactureGenerator) {
    }

    async handle({
        cart
    }: GenerateFactureCommand): Promise<void> {
        this.generator.run(cart);
    }

    subscribedTo(): Command {
        return GenerateFactureCommand;
    }

}
>>>>>>> patrickcart
