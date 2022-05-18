import CreateProductCommand from "@pms-contexts/products/app/create/CreateProductCommand";
import Product from "@pms-contexts/products/domain/Product";

export default class CreateProductCommandMother {
    static fromProduct(product: Product): CreateProductCommand {
        const {
            id,
            commerceId,
            name,
            price,
            description
        } = product.toPrimitives();
        return new CreateProductCommand(
            id, commerceId, name, price, description
        );
    }
}
