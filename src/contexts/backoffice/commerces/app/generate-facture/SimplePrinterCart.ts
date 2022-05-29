import FacturePrinter from "@backoffice-contexts/commerces/app/generate-facture/FacturePrinter";
import CommerceWithProducts from "@backoffice-contexts/commerces/domain/CommerceWithProducts";
import {Logger} from "@shared/domain/Logger";

export default class SimplePrinterCart implements FacturePrinter {

    constructor(readonly logger: Logger) {
    }

    print(commerceWithProducts: Array<CommerceWithProducts>): void {
        for (const value of commerceWithProducts) {
            this.logger.info(`Commerce: ${value.commerce.name}`);
            for (const product of value.products)
                this.logger.info(`\tProduct: ${product.product.name}, with price: ${product.price}`);
        }
        let total = 0;
        for (const commerce of commerceWithProducts) {
            total += commerce.products.reduce((acc, cur) => acc + cur.price.value, 0);
        }
        this.logger.info(`Total: ${total}`);
    }
}