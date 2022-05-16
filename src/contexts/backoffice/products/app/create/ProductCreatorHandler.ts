import { CommandHandler } from "@shared/domain/bus/command/CommandHandler";
import { Command } from "@shared/domain/bus/command/Command";
import UuidVo from "@shared/domain/UuidVo";
import CreateProductResponse from "@backoffice-contexts/products/app/create/CreateProductResponse";
import CreateProductCommand from "@backoffice-contexts/products/app/create/CreateProductCommand";
import ProductNameVo from "@backoffice-contexts/products/domain/ProductNameVo";
import ProductPriceVo from "@backoffice-contexts/products/domain/ProductPriceVo";
import ProductDescriptionVo from "@backoffice-contexts/products/domain/ProductDescriptionVo";
import ProductCreator from "@backoffice-contexts/products/app/create/ProductCreator";

export default class CommerceProductHandler implements CommandHandler<CreateProductCommand,
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
            new ProductPriceVo(price),
            new ProductDescriptionVo(description),
        );
        return new CreateProductResponse(response);
    }

    subscribedTo(): Command {
        return CreateProductResponse;
    }

}
