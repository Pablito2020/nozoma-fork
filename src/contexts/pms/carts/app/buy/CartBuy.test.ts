import CartRepositoryMock from "../../__mocks__/ProductRepository.mock";
import CartMother from "../../mothers/Cart.mother";
import CartBuy from "./CartBuy";
import CartBuyHandler from "./CartBuyHandler";
import ProductMother from "../../../products/mothers/Product.mother";
import EventBusMock from "@shared/__mocks__/EventBus.mock";
import CartBuyCommandMother from "@pms-contexts/carts/mothers/CartBuyCommandMother";
import CartBoughtEventMother from "@pms-contexts/carts/mothers/CartBoughtEventMother";
import CartIsEmpty from "@pms-contexts/carts/domain/CartIsEmpty";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import CartAlreadyBought from "@pms-contexts/carts/domain/CartAlreadyBought";

describe(CartBuy, () => {

    it('should change isBought to true if cart exists', async () => {
        const cartRepository = new CartRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new CartBuy(cartRepository, eventBus),
            handler = new CartBuyHandler(useCase),
            product = ProductMother.random(),
            oldCart = CartMother.withProducts([product]),
            newCart = CartMother.withBoughtCart(oldCart),
            command = CartBuyCommandMother.create(oldCart);

        cartRepository.whenFindByIdThenReturn(oldCart);

        // eslint-disable-next-line one-var
        const response = await handler.handle(command);

        cartRepository.assertUpdateIsCalledWith(newCart);

        expect(response.data)
            .toStrictEqual(newCart);
    });

    it('should send event if cart is bought and changed on database', async () => {
        const cartRepository = new CartRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new CartBuy(cartRepository, eventBus),
            handler = new CartBuyHandler(useCase),
            product = ProductMother.random(),
            oldCart = CartMother.withProducts([product]),
            newCart = CartMother.withBoughtCart(oldCart),
            command = CartBuyCommandMother.create(oldCart),
            expectedEvent = CartBoughtEventMother.fromCart(newCart);

        cartRepository.whenFindByIdThenReturn(oldCart);

        // eslint-disable-next-line one-var
        const response = await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expectedEvent);

        expect(response.data)
            .toStrictEqual(newCart);
    });


    it('throw CartDoesNotExist error if cart does not exist', async () => {
        const cartRepository = new CartRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new CartBuy(cartRepository, eventBus),
            handler = new CartBuyHandler(useCase),
            cart = CartMother.randomWithoutProducts(),
            command = CartBuyCommandMother.create(cart);

        cartRepository.whenFindByIdThenReturn(null);

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(CartDoesNotExist)

        eventBus.assertNothingPublished();

    });

    it('throw cartIsEmpty error if cart without product is bought', async () => {
        const cartRepository = new CartRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new CartBuy(cartRepository, eventBus),
            handler = new CartBuyHandler(useCase),
            cart = CartMother.randomWithoutProducts(),
            command = CartBuyCommandMother.create(cart);

        cartRepository.whenFindByIdThenReturn(cart);

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(CartIsEmpty)

        eventBus.assertNothingPublished();

    });

    it('already bought cart throws CartAlreadyBought exception', async () => {
        const cartRepository = new CartRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new CartBuy(cartRepository, eventBus),
            handler = new CartBuyHandler(useCase),
            cart = CartMother.withBoughtCart(CartMother.randomWithOneProduct()),
            command = CartBuyCommandMother.create(cart);

        cartRepository.whenFindByIdThenReturn(cart);

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(CartAlreadyBought)

        eventBus.assertNothingPublished();

    });

});
