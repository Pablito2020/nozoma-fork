import Product from "@backoffice-contexts/products/domain/Product";
import PriceVo from "@backoffice-contexts/commerces/domain/PriceVo";

export default interface ProductWithPrice {
    product: Product,
    price: PriceVo
}
