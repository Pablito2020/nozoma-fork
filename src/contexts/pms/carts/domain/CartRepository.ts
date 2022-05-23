import Cart from "@pms-contexts/carts/domain/Cart";

export interface CartRepository {
    save(cart: Cart): Promise<void>
}
