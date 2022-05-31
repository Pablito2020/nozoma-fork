import {CartFacture} from "@backoffice-contexts/commerces/domain/CartFacture";
import CartFactureParser from "@backoffice-contexts/commerces/app/generate-facture/FactureParser";
import {CartPrimitive} from "@backoffice-contexts/commerces/domain/CartPrimitive";
import CartProductPrimitive from "@backoffice-contexts/commerces/domain/CartProductPrimitive";

export default class FactureCartParser implements CartFactureParser {

    parse(cart: CartPrimitive): Array<CartFacture> {
        const map = this.getMapFromCart(cart);
        return this.getArrayOfCartFactures(map);
    }

    private getMapFromCart(cart: CartPrimitive): Map<string, Array<CartProductPrimitive>> {
        const result: Map<string, Array<CartProductPrimitive>> = new Map<string, Array<CartProductPrimitive>>();
        cart.products.forEach(value => {
            if (result.has(value.commerceId)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                result.get(value.commerceId).push(value);
            } else {
                result.set(value.commerceId, [value]);
            }
        });
        return result;
    }

    private getArrayOfCartFactures(map: Map<string, Array<CartProductPrimitive>>): Array<CartFacture> {
        const resultArray = Array<CartFacture>();
        map.forEach((value, key) => {
            resultArray.push({commerceId: key, products: value});
        });
        return resultArray
    }

}