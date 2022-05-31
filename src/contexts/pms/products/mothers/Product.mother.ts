import UuidVo from '@shared/domain/UuidVo';
import UuidMother from '@shared/domain/mothers/Uuid.mother';
import ProductDescriptionVo from "@pms-contexts/products/domain/ProductDescriptionVo";
import PriceVo from "@pms-contexts/products/domain/PriceVo";
import ProductNameVo from "@pms-contexts/products/domain/ProductNameVo";
import Product from "@pms-contexts/products/domain/Product";
import ProductNameMother from "@pms-contexts/products/mothers/ProductName.mother";
import ProductDescriptionMother from "@pms-contexts/products/mothers/ProductDescription.mother";
import ProductPriceMother from "@pms-contexts/products/mothers/ProductPriceMother";

export default class ProductMother {
    static random(): Product {
        return ProductMother.create(
            UuidMother.random(),
            UuidMother.random(),
            ProductNameMother.random(),
            ProductPriceMother.random(),
            ProductDescriptionMother.random()
        );
    }

    static create(
        id: UuidVo,
        commerceId: UuidVo,
        name: ProductNameVo,
        price: PriceVo,
        description: ProductDescriptionVo
    ): Product {
        return new Product(
            id, commerceId, name, price, description
        );
    }
}
