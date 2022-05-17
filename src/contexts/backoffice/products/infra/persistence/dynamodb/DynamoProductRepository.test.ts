/*import { DocumentClient } from "aws-sdk/clients/dynamodb";
import DynamoProductRepository from "@backoffice-contexts/products/infra/persistence/dynamodb/DynamoProductRepository";
import ProductMother from "@backoffice-contexts/products/mothers/Product.mother"

describe(DynamoProductRepository, () => {
    const TABLE_NAME = "backoffice-joel-patrick-backoffice-dynamodb-table",
        PRODUCT_ID = "productId";
    let client: DocumentClient;
    let repo: DynamoProductRepository;
    beforeAll(() => {
        client = new DocumentClient()

        // {
        //     endpoint: "http://localhost:4566/",
        //     region: "eu-west-1",
        //     credentials: {
        //         accessKeyId: "test",
        //         secretAccessKey: "test"
        //     }
        // });
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
});
*/