import { Command } from '@shared/domain/bus/command/Command';
import Cart from "@backoffice-contexts/commerces/domain/CartProduct";

export default class GenerateFactureCommand implements Command{
    constructor(
        readonly cart: Cart
    ) {
    }
}