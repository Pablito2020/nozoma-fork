import Aggregate from '@shared/domain/Aggregate';

export default class Facture extends Aggregate {
    constructor(
        readonly cart: Cart
    ) {
        super();
    }

    static create(
        info: Array<CartProduct>,
    ): any[] {
        const factures = new Array(info.length);
        for (let i = 0; i < cart.length; i++) {
            info[i] = cart[i].products
        }

        factures.fill(0, 0, factures.length)

        //assignar commerceid a les factures
        var alreadyAdded = false
        for (let i = 0; i < info.length; i++) {
            for (let j = 0; j < info.length; j++) {
                if (factures[0][j] === info[i].commerceId) {
                    alreadyAdded = true
                }
            }
            if (!alreadyAdded) {
                factures[0][i] = info[i].commerceId
            }
        }

        //omplir factura amb productes i price
        let isFill = false;
        for (let i = 0; i < info.length; i++) {
            isFill = false
            for (let j = 0; j < info.length; j++) {
                if (factures[0][j] === info[i].commerceId && !isFill) {
                    for (let k = 1; k < info.length; k++) {                             //fill columns with productId + price
                        if (factures[k][j] === null && !isFill) {
                            factures[k][j] = info[j].price
                            isFill = true
                        }
                    }
                }
            }
        }


        //get total price
        let total = 0
        for(let i = 0; i < info.length; i++) {
            for(let j = 1; j < info.length; j++) {
                total += factures[j][i]
            }
            factures[factures.length - 1][i] = "Total = " + total
        }
        return factures
    }

    toPrimitives() {
        throw new Error('Method not implemented.');
    }

}
