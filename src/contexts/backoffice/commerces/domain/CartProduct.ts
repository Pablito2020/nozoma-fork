export default interface CartProduct  {
    commerceId: string,
    productId: string,
    price: number
}

export default interface Cart {
    id: string,
    products: CartProduct,
    isBought: boolean
}
