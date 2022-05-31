import CommerceWithProducts from "@backoffice-contexts/commerces/domain/CommerceWithProducts";

export default interface FacturePrinter {
    print(commerceWithProducts: Array<CommerceWithProducts>): void;
}