import { Command } from '@shared/domain/bus/command/Command';
import {CartPrimitive} from "@backoffice-contexts/commerces/domain/CartPrimitive";

export default class GenerateFactureCommand implements Command{
    constructor(
        readonly cart: CartPrimitive
    ) {
    }
}