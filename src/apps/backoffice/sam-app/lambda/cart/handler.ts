import {Context, SQSEvent} from "aws-lambda";

const handler = async (event: SQSEvent, _context: Context): Promise<void> => {
    const messages = event.Records;
    for(const message of messages) {
        doUseCaseForMessage(JSON.parse(message.body))
    }
    try {
        console.log("Event is:")
        console.log(event)
        // eslint-disable-next-line no-empty
    } catch (_) {
    }
    try {
        console.log("Records is:")
        console.log(event.Records)
        // eslint-disable-next-line no-empty
    } catch (_) {
    }
    try {
        console.log("Records elements are:")
        event.Records.forEach(element => console.log(element))
        // eslint-disable-next-line no-empty
    } catch (_) {
    }
}

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

function doUseCaseForMessage(input: Cart) {
    console.log("Current cart id is: " + input.id)
    console.log("Products: [\n")
    input.products.forEach(product => {
        console.log("Has product with id: " + product.productId)
        console.log("That has commerce: " + product.commerceId)
        console.log("And price: " + product.price)
    })
    console.log("]")
    console.log("Is bought: " + input.isBought)
}
export {handler}
