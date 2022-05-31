import CartProductVo from "@pms-contexts/carts/domain/CartProductVo";
import UuidMother from "@shared/domain/mothers/Uuid.mother";
import ProductPriceMother from "@pms-contexts/products/mothers/ProductPriceMother";
import CartProductPrimitives from "@pms-contexts/carts/domain/CartProductPrimitives";

export default class CartProductMother {

    static random(): CartProductVo {
        return new CartProductVo(
            UuidMother.random(),
            UuidMother.random(),
            ProductPriceMother.random()
        )
    }

    static randomPrimitives(): CartProductPrimitives {
        return CartProductMother.random().value
    }

}
