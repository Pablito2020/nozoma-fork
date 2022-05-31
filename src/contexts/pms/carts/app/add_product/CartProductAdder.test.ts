import CartRepositoryMock from "../../__mocks__/ProductRepository.mock";
import CartMother from "../../mothers/Cart.mother";
import CartProductAdder from "./CartProductAdder";
import ProductRepositoryMock from "../../../products/__mocks__/ProductRepository.mock";
import CartProductAdderHandler from "./CartProductAdderHandler";
import ProductMother from "../../../products/mothers/Product.mother";
import AddProductCommandMother from "@pms-contexts/carts/mothers/AddProductCommandMother";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import ProductDoesNotExist from "@pms-contexts/carts/domain/ProductDoesNotExist";
import CartAlreadyBought from "@pms-contexts/carts/domain/CartAlreadyBought";

describe(CartProductAdder, () => {

    it('should add a new product if it exists and cart exists', async () => {
        const cartRepository = new CartRepositoryMock(),
            productRepository = new ProductRepositoryMock(),
            useCase = new CartProductAdder(cartRepository, productRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            oldCart = CartMother.randomWithoutProducts(),
            newCart = CartMother.withIdAndProducts(oldCart.id, [addedProduct]),
            command = AddProductCommandMother.fromCartAndProduct(newCart, addedProduct);

        cartRepository.whenFindByIdThenReturn(oldCart);
        productRepository.whenFindByIdThenReturn(addedProduct);

        // eslint-disable-next-line one-var
        const response = await handler.handle(command);

        cartRepository.assertUpdateIsCalledWith(newCart);

        expect(response.data)
            .toStrictEqual(newCart);
    });

    it('should throw cart does not exist if cart does not exist', async () => {
        const cartRepository = new CartRepositoryMock(),
            productRepository = new ProductRepositoryMock(),
            useCase = new CartProductAdder(cartRepository, productRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            cart = CartMother.randomWithoutProducts(),
            command = AddProductCommandMother.fromCartAndProduct(cart, addedProduct);

        productRepository.whenFindByIdThenReturn(addedProduct);
        cartRepository.whenFindByIdThenReturn(null);

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(CartDoesNotExist);

    });

    it('should throw product does not exist if product does not exist', async () => {
        const cartRepository = new CartRepositoryMock(),
            productRepository = new ProductRepositoryMock(),
            useCase = new CartProductAdder(cartRepository, productRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            cart = CartMother.randomWithoutProducts(),
            command = AddProductCommandMother.fromCartAndProduct(cart, addedProduct);

        cartRepository.whenFindByIdThenReturn(cart);
        productRepository.whenFindByIdThenReturn(null);

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(ProductDoesNotExist);

    });

    it('should throw CartAlreadyBought if tries to add a product on a bought cart', async () => {
        const cartRepository = new CartRepositoryMock(),
            productRepository = new ProductRepositoryMock(),
            useCase = new CartProductAdder(cartRepository, productRepository),
            handler = new CartProductAdderHandler(useCase),
            addedProduct = ProductMother.random(),
            cart = CartMother.withBoughtCart(CartMother.randomWithOneProduct()),
            command = AddProductCommandMother.fromCartAndProduct(cart, addedProduct);

        cartRepository.whenFindByIdThenReturn(cart);
        productRepository.whenFindByIdThenReturn(addedProduct);

        // eslint-disable-next-line one-var
        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(CartAlreadyBought);

    });

});
