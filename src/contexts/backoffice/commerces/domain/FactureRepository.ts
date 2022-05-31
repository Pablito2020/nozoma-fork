import Product from "@backoffice-contexts/products/domain/Product";
import { Nullable } from "@shared/domain/Nullable";
import UuidVo from "@shared/domain/UuidVo";
import Commerce from "./Commerce";

export interface FactureRepository{
    findCommerceById(id: UuidVo) : Promise<Nullable<Commerce>>
    findProductPriceById(id: UuidVo) : Promise<Nullable<Product>>
}