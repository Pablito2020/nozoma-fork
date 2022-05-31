import Commerce from "@backoffice-contexts/commerces/domain/Commerce";
import ProductWithPrice from "@backoffice-contexts/commerces/domain/ProductWithPrice";

export default interface CommerceWithProducts{
    commerce: Commerce,
    products: Array<ProductWithPrice>
}
