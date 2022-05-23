import Product from "@pms-contexts/carts/domain/CartPrimitives";
import ProductVo from "@pms-contexts/carts/domain/ProductVo";
import ValueObject from "@shared/domain/ValueObject";

export default class ProductListVo extends ValueObject<Array<ProductVo>>{
    private products: Array<ProductVo>

    constructor(productList: Array<Product>) {
        const products = new Array<ProductVo>()
        super(products);
        this.products = products
        for (const product of productList){
            this.products.push(new ProductVo(product.productId, product.commerceId))
        }
    }

    toString(): string {
        return this.products.map(ProductVo.toString).join()
    }
}
