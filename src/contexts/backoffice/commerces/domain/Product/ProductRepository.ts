import { Nullable } from '@shared/domain/Nullable';
import UuidVo from '@shared/domain/UuidVo';
import Product from "@backoffice-contexts/commerces/domain/Product/Product";


export interface ProductRepository {
    save(product: Product) : Promise<void>
    findById(id: UuidVo) : Promise<Nullable<Product>>
}

