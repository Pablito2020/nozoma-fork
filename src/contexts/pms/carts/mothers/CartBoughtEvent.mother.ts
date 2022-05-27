import Product from "@pms-contexts/products/domain/Product";
import ProductCreatedEvent from "@pms-contexts/products/domain/ProductCreatedEvent";

export default class ProductCreatedEventMother {
    static fromCommerce(product: Product): ProductCreatedEvent {
        return new ProductCreatedEvent(product.toPrimitives());
    }
}
