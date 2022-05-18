import faker from '@faker-js/faker';
import ProductPriceVo from '../domain/ProductPriceVo';

export default class ProductPriceMother {
    static random() : ProductPriceVo {
        return ProductPriceMother.create(
            faker.datatype.number({ min: 0, max: 100, precision: 0.01})
        )
    }
    static create(price: number) : ProductPriceVo {
        return new ProductPriceVo(price)
    }
}