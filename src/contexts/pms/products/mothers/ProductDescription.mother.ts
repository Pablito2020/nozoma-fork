import faker from '@faker-js/faker';
import ProductDescriptionVo from "@pms-contexts/products/domain/ProductDescriptionVo";

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
