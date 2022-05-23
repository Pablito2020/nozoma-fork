import Product from "@backoffice-contexts/products/domain/Product";
import UuidVo from "@shared/domain/UuidVo";
import AlreadyExists from "@shared/domain/AlreadyExists";
import ProductNameVo from "@backoffice-contexts/products/domain/ProductNameVo";
import ProductPriceVo from "@backoffice-contexts/products/domain/ProductPriceVo";
import ProductDescriptionVo from "@backoffice-contexts/products/domain/ProductDescriptionVo";
import {ProductRepository} from "../../domain/ProductRepository";
import { EventBus } from "@shared/domain/bus/event/EventBus";
import {CommerceRepository} from "@backoffice-contexts/commerces/domain/CommerceRepository";
import NotExistCommerceException from "@backoffice-contexts/commerces/domain/NotExistsCommerce";


export default class ProductCreator {
    constructor(
        readonly repo: ProductRepository,
        readonly eventBus: EventBus,
        readonly commerceRepo: CommerceRepository
    ) {
    }

    async run(
        id: UuidVo,
        commerceId: UuidVo,
        name: ProductNameVo,
        price: ProductPriceVo,
        description: ProductDescriptionVo,
    ): Promise<Product> {
        const possibleCommerceId = this.commerceRepo.findById(commerceId)
        if(possibleCommerceId === null) {
            throw new NotExistCommerceException("Commerce with id" + id + "doesn't exist")
        }
        // eslint-disable-next-line one-var
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
