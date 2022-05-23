import UuidVo from "@shared/domain/UuidVo";
import ValueObject from "@shared/domain/ValueObject";
import Product from "@pms-contexts/carts/domain/CartPrimitives";

export default class ProductVo extends ValueObject<Product>{
    private readonly _productId: UuidVo;
    private readonly _commerceId: UuidVo;

    constructor(productId: string, commerceId: string) {
        super({
            productId,
            commerceId
        });
        this._productId = new UuidVo(productId);
        this._commerceId = new UuidVo(commerceId)
    }

    get productId(): UuidVo {
        return this._productId;
    }

    get commerceId(): UuidVo {
        return this._commerceId;
    }
    
    toString(): string {
        return this.value.toString();
    }
}
