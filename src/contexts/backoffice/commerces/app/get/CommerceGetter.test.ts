import CommerceRepositoryMock from "@backoffice-contexts/commerces/__mocks__/CommerceRepository.mock";
import CommerceMother from "@backoffice-contexts/commerces/mothers/Commerce.mother";
import CommerceGetterHandler from "@backoffice-contexts/commerces/app/get/CommerceGetterHandler";
import CommerceGetter from "@backoffice-contexts/commerces/app/get/CommerceGetter";
import GetCommerceQueryMother from "@backoffice-contexts/commerces/mothers/GetCommerceQueryMother";
import NotExistCommerceException from "@backoffice-contexts/commerces/domain/NotExistsCommerce";

describe(CommerceGetter, () => {
    it('should return a commerce object when id exists', async () => {
        const repo = new CommerceRepositoryMock(),
            getter = new CommerceGetter(repo),
            handler = new CommerceGetterHandler(getter),
            expected = CommerceMother.random(),
            query = GetCommerceQueryMother.fromCommerce(expected);

        repo.whenFindByIdThenReturn(expected);

        // eslint-disable-next-line one-var
        const response = await handler.handle(query);
        expect(response.data).toStrictEqual(expected);

        repo.assertFindIdIsCalledWith(expected.id);
    });
});

describe(CommerceGetter, () => {
    it('should throw an error if commerce object doesn\'t exist', async () => {
        const repo = new CommerceRepositoryMock(),
            getter = new CommerceGetter(repo),
            handler = new CommerceGetterHandler(getter),
            expected = CommerceMother.random(),
            query = GetCommerceQueryMother.fromCommerce(expected);

        repo.whenFindByIdThenReturn(null);

        await expect(handler.handle(query))
            .rejects
            .toBeInstanceOf(NotExistCommerceException);

        repo.assertFindIdIsCalledWith(expected.id);

    });
});