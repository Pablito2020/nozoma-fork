import CartRepositoryMock from "../../__mocks__/ProductRepository.mock";
import CartMother from "../../mothers/Cart.mother";
import CartProductAdder from "./CartProductAdder";
import CartProductAdderHandler from "./CartProductAdderHandler";
import ProductMother from "../../../products/mothers/Product.mother";
import AddProductCommandMother from "@pms-contexts/carts/mothers/AddProductCommandMother";
import QueryBusMock from "@shared/__mocks__/QueryBus.mock";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import ProductDoesNotExist from "@pms-contexts/carts/domain/ProductDoesNotExist";
import CartAlreadyBought from "@pms-contexts/carts/domain/CartAlreadyBought";

describe(CartProductAdder, () => {

    it('should add a new product if it exists and cart exists', async () => {
        const queryBus = new QueryBusMock(),
            cartRepository = new CartRepositoryMock(),
            useCase = new CartProductAdder(queryBus, cartRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            oldCart = CartMother.randomWithoutProducts(),
            newCart = CartMother.withIdAndProducts(oldCart.id, [addedProduct]),
            command = AddProductCommandMother.fromCartAndProduct(newCart, addedProduct);

        queryBus.whenFindByQueryCartThenReturn(oldCart);
        queryBus.whenFindByQueryProductThenReturn(addedProduct);

        // eslint-disable-next-line one-var
        const response = await handler.handle(command);

        cartRepository.assertUpdateIsCalledWith(newCart);

        expect(response.data)
            .toStrictEqual(newCart);
    });

    it('should throw cart does not exist if cart does not exist', async () => {
        const queryBus = new QueryBusMock(),
            cartRepository = new CartRepositoryMock(),
            useCase = new CartProductAdder(queryBus, cartRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            cart = CartMother.randomWithoutProducts(),
            command = AddProductCommandMother.fromCartAndProduct(cart, addedProduct);

        queryBus.whenFindByQueryProductThenReturn(addedProduct);
        queryBus.whenFindByQueryCartThrowException();

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(CartDoesNotExist);

    });

    it('should throw product does not exist if product does not exist', async () => {
        const queryBus = new QueryBusMock(),
            cartRepository = new CartRepositoryMock(),
            useCase = new CartProductAdder(queryBus, cartRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            cart = CartMother.randomWithoutProducts(),
            command = AddProductCommandMother.fromCartAndProduct(cart, addedProduct);

        queryBus.whenFindByQueryCartThenReturn(cart);
        queryBus.whenFindByQueryProductThrowException();

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(ProductDoesNotExist);

    });

    it('should throw CartAlreadyBought if tries to add a product on a bought cart', async () => {
        const queryBus = new QueryBusMock(),
            cartRepository = new CartRepositoryMock(),
            useCase = new CartProductAdder(queryBus, cartRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            cart = CartMother.withBoughtCart(CartMother.randomWithOneProduct()),
            command = AddProductCommandMother.fromCartAndProduct(cart, addedProduct);

        queryBus.whenFindByQueryCartThenReturn(cart);
        queryBus.whenFindByQueryProductThenReturn(addedProduct);

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(CartAlreadyBought);

    });

});
