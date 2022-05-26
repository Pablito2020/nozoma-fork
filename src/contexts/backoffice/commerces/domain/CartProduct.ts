<<<<<<< HEAD
export default interface CartProduct  {
    commerceId: string,
    productId: string,
    price: number
}

export default interface Cart {
    id: string,
    products: CartProduct,
=======
interface Cart {
    id: string
    products: Array<CartProduct>
>>>>>>> patrickcart
    isBought: boolean
}

interface CartProduct {
    productId: string,
    commerceId: string,
    price: number
}