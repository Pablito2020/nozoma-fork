import ProductMother from "@pms-contexts/products/mothers/Product.mother";
import ProductCreator from "@pms-contexts/products/app/create/ProductCreator";
import ProductCreatorHandler from "@pms-contexts/products/app/create/ProductCreatorHandler";
import ProductRepositoryMock from "@pms-contexts/products/__mocks__/ProductRepository.mock";
import CreateProductCommandMother from "@pms-contexts/products/mothers/CreateProductCommand.mother";
import CartCreator from "@pms-contexts/carts/app/create/CartCreator";
import AlreadyExists from "@shared/domain/AlreadyExists";
import CartRepositoryMock from "@pms-contexts/carts/__mocks__/ProductRepository.mock";
import CartCreatorHandler from "@pms-contexts/carts/app/create/CartCreatorHandler";

describe(CartCreator, () => {
    it('should create a new cart when cart doesn\'t already exist', async () => {
        const repo = new CartRepositoryMock(),
            creator = new CartCreator(repo),
            handler = new CartCreatorHandler(creator),
            expected = CartMother.random(),
            command = CreateCartCommandMother.fromProduct(expected);

        // eslint-disable-next-line one-var
        const response = await handler.handle(command);

        repo.assertSaveIsCalledWith(expected);

        expect(response.data)
            .toStrictEqual(expected);
    });

    it('should throw AlreadyExists when cart with same id already exists', async () => {
        const repo = new CartRepositoryMock(),
            creator = new CartCreator(repo),
            handler = new CartCreatorHandler(creator),
            expected = CartMother.random(),
            command = CreateCartCommandMother.fromProduct(expected);

        repo.whenFindByIdThenReturn(null);

        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(AlreadyExists);

        repo.assertFindIdIsCalledWith(expected.id);
        repo.assertSaveIsNotCalled();

    });
})

