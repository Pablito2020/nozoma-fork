import CartProductPrimitive from "@backoffice-contexts/commerces/domain/CartProductPrimitive";

export interface CartPrimitive {
    products: Array<CartProductPrimitive>
}