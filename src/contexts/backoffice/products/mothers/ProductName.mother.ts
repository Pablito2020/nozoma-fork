import faker from '@faker-js/faker';
import ProductNameVo from '../domain/ProductNameVo';

export default class ProductNameMother {
    static random() : ProductNameVo {
        return ProductNameMother.create(
            faker.lorem.words()
        )
    }
    static create(name: string) : ProductNameVo {
        return new ProductNameVo(name)
    }
}
