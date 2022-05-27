import UuidVo from '@shared/domain/UuidVo';
import UuidMother from '@shared/domain/mothers/Uuid.mother';
import CartProductList from "@pms-contexts/carts/domain/CartProductList";
import Cart from "@pms-contexts/carts/domain/Cart";

export default class CartMother {
    static random(): Cart {
        return CartMother.create(
            UuidMother.random(),
            CartProductListMother.random(),
            false
        );
    }

    static create(
        id: UuidVo,
        products: CartProductList,
        isBought: boolean
    ): Cart {
        return new Cart(
            id, products, isBought
        );
    }
}
