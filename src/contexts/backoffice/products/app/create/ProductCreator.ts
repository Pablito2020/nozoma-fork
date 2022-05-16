import { CommerceRepository } from "@backoffice-contexts/commerces/domain/CommerceRepository";
import Product from "@backoffice-contexts/products/domain/Product";
import UuidVo from "@shared/domain/UuidVo";
import { EventBus } from "@shared/domain/bus/event/EventBus";
import AlreadyExists from "@shared/domain/AlreadyExists";
import ProductNameVo from "@backoffice-contexts/products/domain/ProductNameVo";
import ProductPriceVo from "@backoffice-contexts/products/domain/ProductPriceVo";
import ProductDescriptionVo from "@backoffice-contexts/products/domain/ProductDescriptionVo";

export default class ProductCreator {
    constructor(
        readonly repo: CommerceRepository,
        readonly eventBus: EventBus
    ) {
    }

    async run(
        id: UuidVo,
        commerceId: UuidVo,
        name: ProductNameVo,
        price: ProductPriceVo,
        description: ProductDescriptionVo,
    ): Promise<Product> {
        const product = Product.create(
                id,
                commerceId,
                name,
                price,
                description
            ),
            [commerceByEmail, commerceById] = await Promise.all([
                this.repo.findByEmail(id),
                this.repo.findById(id)
            ]);
        if (commerceByEmail || commerceById) {
            throw new AlreadyExists("Commerce with id " + id + " already exists");
        }
        //await this.repo.save(product);
        await this.eventBus.publish(product.pullDomainEvents());
        return product;

    }

}
