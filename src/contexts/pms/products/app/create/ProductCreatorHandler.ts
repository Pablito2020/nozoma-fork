import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import { Command } from "@shared/domain/bus/command/Command";
import UuidVo from "@shared/domain/UuidVo";
import CreateProductResponse from "@pms-contexts/products/app/create/CreateProductResponse";
import CreateProductCommand from "@pms-contexts/products/app/create/CreateProductCommand";
import ProductCreator from "@pms-contexts/products/app/create/ProductCreator";
import ProductDescriptionVo from "@pms-contexts/products/domain/ProductDescriptionVo";
import ProductNameVo from "@pms-contexts/products/domain/ProductNameVo";
import PriceVo from "@pms-contexts/products/domain/PriceVo";

export default class ProductCreatorHandler implements CommandHandler<CreateProductCommand,
    CreateProductResponse> {
    constructor(private creator: ProductCreator) {
    }

    async handle({
        id,
        commerceId,
        name,
        price,
        description
    }: CreateProductCommand): Promise<CreateProductResponse> {
        const response = await this.creator.run(
            new UuidVo(id),
            new UuidVo(commerceId),
            new ProductNameVo(name),
            new PriceVo(price),
            new ProductDescriptionVo(description)
        );
        return new CreateProductResponse(response);
    }

    subscribedTo(): Command {
        return CreateProductCommand;
    }

}
