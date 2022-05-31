import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";

export type CartPrimitives = {
    id: string;
    products: Array<CartProductPrimitives>;
    isBought: boolean;
}