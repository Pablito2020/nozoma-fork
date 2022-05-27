import faker from '@faker-js/faker';
import PriceVo from "@pms-contexts/products/domain/PriceVo";
import CartProductList from "@pms-contexts/carts/domain/CartProductList";

export default class CartProductListMother {
    static random() : CartProductList {
        return CartProductListMother.create(
            faker.datatype.number()
        )
    }
    static create(price: number) : CartProductList {
        return new CartProductList(price)
    }
}
