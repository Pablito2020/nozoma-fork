import Product from "@backoffice-contexts/products/domain/Product";
import PriceVo from "@pms-contexts/products/domain/PriceVo";

export default interface ProductWithPrice {
    product: Product,
    price: PriceVo
}
