import Product from "@backoffice-contexts/products/domain/Product";
import UuidVo from "@shared/domain/UuidVo";
import AlreadyExists from "@shared/domain/AlreadyExists";
import ProductNameVo from "@backoffice-contexts/products/domain/ProductNameVo";
import ProductPriceVo from "@backoffice-contexts/products/domain/ProductPriceVo";
import ProductDescriptionVo from "@backoffice-contexts/products/domain/ProductDescriptionVo";
import {ProductRepository} from "../../domain/ProductRepository";
import { EventAWSBus } from "@shared/domain/bus/event/EventAWSBus";

export default class ProductCreator {
    constructor(
        readonly repo: ProductRepository,
        readonly eventBus: EventAWSBus
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
            productById = await this.repo.findById(id);

        if (productById) {
            throw new AlreadyExists("Product with id " + id + " already exists");
        }
        await this.repo.save(product);
        await this.eventBus.publish(product.pullDomainEvents());
        return product;
    }
}
