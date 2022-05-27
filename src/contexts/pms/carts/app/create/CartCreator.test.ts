import CartCreator from "@pms-contexts/carts/app/create/CartCreator";
import AlreadyExists from "@shared/domain/AlreadyExists";
import CartRepositoryMock from "@pms-contexts/carts/__mocks__/ProductRepository.mock";
import CartCreatorHandler from "@pms-contexts/carts/app/create/CartCreatorHandler";
import CartMother from "@pms-contexts/carts/mothers/Cart.mother";
import CreateCartCommandMother from "@pms-contexts/carts/mothers/CreateCartCommand.mother";

describe(CartCreator, () => {
    it('should create a new cart when cart doesn\'t already exist', async () => {
        const repo = new CartRepositoryMock(),
            creator = new CartCreator(repo),
            handler = new CartCreatorHandler(creator),
            expected = CartMother.randomWithoutProducts(),
            command = CreateCartCommandMother.fromCart(expected);

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
            expected = CartMother.randomWithoutProducts(),
            command = CreateCartCommandMother.fromCart(expected);

        repo.whenFindByIdThenReturn(expected);

        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(AlreadyExists);

        repo.assertFindIdIsCalledWith(expected.id);
        repo.assertSaveIsNotCalled();

    });
})

