import ProductMother from "@pms-contexts/products/mothers/Product.mother";
import ProductCreator from "@pms-contexts/products/app/create/ProductCreator";
import ProductCreatorHandler from "@pms-contexts/products/app/create/ProductCreatorHandler";
import ProductRepositoryMock from "@pms-contexts/products/__mocks__/ProductRepository.mock";
import CreateProductCommandMother from "@pms-contexts/products/mothers/CreateProductCommand.mother";
import AlreadyExists from "@shared/domain/AlreadyExists";

describe(ProductCreator, () => {
    it('should create a new product when product doesn\'t already exist', async () => {
        const repo = new ProductRepositoryMock(),
            creator = new ProductCreator(repo),
            handler = new ProductCreatorHandler(creator),
            expected = ProductMother.random(),
            command = CreateProductCommandMother.fromProduct(expected);

        // eslint-disable-next-line one-var
        const response = await handler.handle(command);

        repo.assertSaveIsCalledWith(expected);

        expect(response.data)
            .toStrictEqual(expected);
    });

    it('should throw AlreadyExists when product with same id already exists', async () => {
        const repo = new ProductRepositoryMock(),
            creator = new ProductCreator(repo),
            handler = new ProductCreatorHandler(creator),
            expected = ProductMother.random(),
            command = CreateProductCommandMother.fromProduct(expected);

        repo.whenFindByIdThenReturn(null);

        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(AlreadyExists);

        repo.assertFindIdIsCalledWith(expected.id);
        repo.assertSaveIsNotCalled();

    });
});
