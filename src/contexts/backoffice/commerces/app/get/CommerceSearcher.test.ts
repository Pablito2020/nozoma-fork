import CommerceRepositoryMock from "@backoffice-contexts/commerces/__mocks__/CommerceRepository.mock";
import CommerceMother from "@backoffice-contexts/commerces/mothers/Commerce.mother";
import CommerceSearcherHandler from "@backoffice-contexts/commerces/app/get/CommerceSearcherHandler";
import CommerceSearcher from "@backoffice-contexts/commerces/app/get/CommerceSearcher";
import SearchCommerceQueryMother from "@backoffice-contexts/commerces/mothers/SearchCommerceQueryMother";
import NotExistCommerceException from "@backoffice-contexts/commerces/domain/NotExistsCommerce";

describe(CommerceSearcher, () => {
    it('should return a commerce object when id exists', async () => {
        const repo = new CommerceRepositoryMock(),
            getter = new CommerceSearcher(repo),
            handler = new CommerceSearcherHandler(getter),
            expected = CommerceMother.random(),
            query = SearchCommerceQueryMother.fromCommerce(expected);

        repo.whenFindByIdThenReturn(expected);

        // eslint-disable-next-line one-var
        const response = await handler.handle(query);
        expect(response.data).toStrictEqual(expected);

        repo.assertFindIdIsCalledWith(expected.id);
    });
});

describe(CommerceSearcher, () => {
    it('should throw an error if commerce object doesn\'t exist', async () => {
        const repo = new CommerceRepositoryMock(),
            getter = new CommerceSearcher(repo),
            handler = new CommerceSearcherHandler(getter),
            expected = CommerceMother.random(),
            query = SearchCommerceQueryMother.fromCommerce(expected);

        repo.whenFindByIdThenReturn(null);

        await expect(handler.handle(query))
            .rejects
            .toBeInstanceOf(NotExistCommerceException);

        repo.assertFindIdIsCalledWith(expected.id);

    });
});