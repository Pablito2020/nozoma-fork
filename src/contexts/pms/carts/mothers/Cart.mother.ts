import UuidVo from '@shared/domain/UuidVo';
import UuidMother from '@shared/domain/mothers/Uuid.mother';
import CartProductList from "@pms-contexts/carts/domain/CartProductList";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartProductListMother from "@pms-contexts/carts/mothers/CartProductListMother";
import Product from "@pms-contexts/products/domain/Product";
import ProductMother from "@pms-contexts/products/mothers/Product.mother";

export default class CartMother {
    static randomWithoutProducts(): Cart {
        return CartMother.create(
            UuidMother.random(),
            CartProductListMother.empty(),
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

    static withIdAndProducts(id: UuidVo, products: Product[]): Cart {
        return CartMother.create(
            id,
            CartProductListMother.withProducts(products),
            false
        );
    }

    static withProducts(product: Product[]): Cart {
        return CartMother.withIdAndProducts(UuidMother.random(), product)
    }

    static withBoughtCart(oldCart: Cart): Cart {
        return CartMother.create(oldCart.id, oldCart.products, true)
    }

    static randomWithOneProduct() {
        return CartMother.withProducts([
            ProductMother.random()
        ])
    }

}
