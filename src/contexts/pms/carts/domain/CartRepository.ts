import Cart from "@pms-contexts/carts/domain/Cart";

export default interface CartRepository {
    save(cart: Cart): Promise<void>
}
