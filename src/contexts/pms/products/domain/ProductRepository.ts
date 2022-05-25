import Product from "@pms-contexts/products/domain/Product";
import UuidVo from "@shared/domain/UuidVo";
import {Nullable} from "@shared/domain/Nullable";

export interface ProductRepository {
    save(commerce: Product): Promise<void>
    findById(id: UuidVo): Promise<Nullable<Product>>
}
