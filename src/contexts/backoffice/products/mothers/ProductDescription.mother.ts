import faker from '@faker-js/faker';
import ProductDescriptionVo from '../domain/ProductDescriptionVo';

export default class ProductDescriptionMother {
    static random() : ProductDescriptionVo {
        return ProductDescriptionMother.create(
            faker.lorem.sentence()
        )
    }
    static create(description: string) : ProductDescriptionVo {
        return new ProductDescriptionVo(description)
    }
}
