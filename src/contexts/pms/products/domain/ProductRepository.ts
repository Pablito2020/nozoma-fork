import Product from "@pms-contexts/products/domain/Product";

export interface ProductRepository {
    save(commerce: Product): Promise<void>
}
