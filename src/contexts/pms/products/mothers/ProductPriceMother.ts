import faker from '@faker-js/faker';
import PriceVo from "@pms-contexts/products/domain/PriceVo";

export default class ProductPriceMother {
    static random() : PriceVo {
        return ProductPriceMother.create(
            faker.datatype.number()
        )
    }
    static create(price: number) : PriceVo {
        return new PriceVo(price)
    }
}
