import Cart from "@pms-contexts/carts/domain/Cart";
import UuidVo from "@shared/domain/UuidVo";
import {Nullable} from "@shared/domain/Nullable";

export default interface CartRepository {
    save(cart: Cart): Promise<void>
    findById(id: UuidVo): Promise<Nullable<Cart>>
}
