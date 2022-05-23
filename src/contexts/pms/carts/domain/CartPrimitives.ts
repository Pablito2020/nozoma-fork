
export type CartPrimitives = {
    id: string;
    products: Array<Product>;
    isBought: boolean;
}

export default interface Product {
    productId: string,
    commerceId: string
}
