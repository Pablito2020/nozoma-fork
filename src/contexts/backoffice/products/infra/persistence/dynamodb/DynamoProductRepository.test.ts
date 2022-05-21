import { DocumentClient } from "aws-sdk/clients/dynamodb";
import DynamoProductRepository from "@backoffice-contexts/products/infra/persistence/dynamodb/DynamoProductRepository";
import ProductMother from "@backoffice-contexts/products/mothers/Product.mother"
import Product from "../../../domain/Product";
import UuidVo from "../../../../../shared/domain/UuidVo";
import ProductNameVo from "../../../domain/ProductNameVo";
import ProductPriceVo from "../../../domain/ProductPriceVo";
import ProductDescriptionVo from "../../../domain/ProductDescriptionVo";

describe(DynamoProductRepository, () => {
    const TABLE_NAME = "backoffice-joel-patrick-backoffice-dynamodb-table",
        PRODUCT_ID = "productId";
    let client: DocumentClient;
    let repo: DynamoProductRepository;
    beforeAll(() => {
        client = new DocumentClient()
        repo = new DynamoProductRepository(client, TABLE_NAME, PRODUCT_ID);
    });

    it("should return when query by id", async () => {
        const product = ProductMother.random();
        await repo.save(product);

        // eslint-disable-next-line one-var
        const found = await repo.findById(product.id);

        expect(found)
            .toStrictEqual(product);
    });

    it("should return 404", async () => {
        const product = new Product(
            new UuidVo("-1"),
            new UuidVo(""),
            new ProductNameVo(""),
            new ProductPriceVo(0),
            new ProductDescriptionVo(""))

        // eslint-disable-next-line one-var
        const error = repo.findById(product.id);

        expect(error).toStrictEqual(404)
    })
});
