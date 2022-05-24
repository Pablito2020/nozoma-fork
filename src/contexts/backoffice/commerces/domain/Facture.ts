import Aggregate from '@shared/domain/Aggregate';
import CartProduct from "@backoffice-contexts/commerces/domain/CartProduct";
import Cart from "@backoffice-contexts/commerces/domain/CartProduct";

export default class Facture extends Aggregate implements Cart{
    constructor(
        cart: Array<Cart> = [],
        info: Array<CartProduct> = [],
        facture: Array<string> = []
    ) {
        super();
    }

    static create(
        cart: Array<Cart>,
        info: Array<CartProduct>,
    ): Facture {
        var factures = new Array(info.length)
        for(let i = 0; i < cart.length; i++) {
            info[i] = cart[i].products
        }

        //assignar commerceid a les factures
        for(let i = 0; i < info.length; i++) {
            for(let j = 0; j < info.length; j++) {
                if(factures[0][j] === info[j].commerceId) {
                    factures[0][i] = info[i].commerceId
                }
            }
            factures[0][i] = info[i].commerceId
        }

        for(let i = 0; i< info.length; i++) {
            if(factures[0][i] === info[i].commerceId) {
                for(let j = 0; j < info.length; j++) {
                    if(factures[i][j] === )
                }
            }
        }
    }
}
