import {ProductWithPricePrimitives} from "@backoffice-contexts/commerces/domain/ProductWithPricePrimitives";

export interface CartFacture {
    commerceId: string;
    products: Array<ProductWithPricePrimitives>;
}

