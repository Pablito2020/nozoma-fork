import UuidMother from "@shared/domain/mothers/Uuid.mother";
import UuidVo from "@shared/domain/UuidVo";
import Product from "../domain/Product";
import ProductDescriptionVo from "../domain/ProductDescriptionVo";
import ProductNameVo from "../domain/ProductNameVo";
import ProductPriceVo from "../domain/ProductPriceVo";
import ProductDescriptionMother from "./ProductDescription.mother";
import ProductNameMother from "./ProductName.mother";
import ProductPriceMother from "./ProductPrice.mother";

export default class ProductMother {

    static random(): ProductMother {
        return ProductMother.create(
            UuidMother.random(),
            UuidMother.random(),
            ProductPriceMother.random(), // Ha de ser un preu PriceMother.random()
            ProductNameMother.random(),
            ProductDescriptionMother.random()
        )
    }
    static create(
        id: UuidVo, 
        commerceId: UuidVo,
        price: ProductPriceVo,
        productName: ProductNameVo,
        productDescription: ProductDescriptionVo       
        ):  ProductMother {
                return new Product(id,commerceId,productName,price,productDescription,
            );
    }
}