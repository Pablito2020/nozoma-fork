interface Cart {
    id: string
    products: Array<CartProduct>
    isBought: boolean
}

interface CartProduct {
    productId: string,
    commerceId: string,
    price: number
}