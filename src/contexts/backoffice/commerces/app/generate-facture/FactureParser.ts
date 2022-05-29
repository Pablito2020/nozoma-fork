import {CartFacture} from "@backoffice-contexts/commerces/domain/CartFacture";
import {CartPrimitive} from "@backoffice-contexts/commerces/domain/CartPrimitive";

export default interface CartFactureParser {
    parse(cart: CartPrimitive): Array<CartFacture>;
}

