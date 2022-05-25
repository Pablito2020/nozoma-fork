import { EventBus } from "@shared/domain/bus/event/EventBus";

export default class FactureCreator{
    constructor(
        readonly eventBus: EventBus //Cua SQS
    ) {
    }

    async run(
        cart: Array<CartProduct> []
    ): P
}