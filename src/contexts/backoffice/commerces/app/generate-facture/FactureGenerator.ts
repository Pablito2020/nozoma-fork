import CartFactureParser from "@backoffice-contexts/commerces/app/generate-facture/FactureParser";
import ProductSearcherHandler from "@backoffice-contexts/products/app/get/ProductSearcherHandler";
import CommerceSearcherHandler from "@backoffice-contexts/commerces/app/get/CommerceSearcherHandler";
import PriceVo from "@pms-contexts/products/domain/PriceVo";
import FacturePrinter from "@backoffice-contexts/commerces/app/generate-facture/FacturePrinter";
import Product from "@backoffice-contexts/products/domain/Product";
import Commerce from "@backoffice-contexts/commerces/domain/Commerce";
import {CartPrimitive} from "@backoffice-contexts/commerces/domain/CartPrimitive";

export default class FactureGenerator {

    constructor(readonly parser: CartFactureParser,
                readonly getProduct: ProductSearcherHandler,
                readonly getCommerce: CommerceSearcherHandler,
                readonly printer: FacturePrinter) {
    }

    async run(
        cart: CartPrimitive
    ): Promise<void> {
        const primitiveCartValues = this.parser.parse(cart),
            cartValues = await Promise.all(primitiveCartValues.map(async cartFacturePrimitive => {
                return {
                    commerce: (await this.getCommerce.handle({id: cartFacturePrimitive.commerceId})).data as Commerce,
                    products: await Promise.all(cartFacturePrimitive.products.map(async product => {
                        return {
                            product: (await this.getProduct.handle({id: product.productId})).data as Product,
                            price: new PriceVo(product.price)
                        }
                    }))
                }
            }))
        this.printer.print(cartValues)
    }
}