import DynamoCommerceRepository from "@backoffice-contexts/commerces/infra/persistence/dynamodb/DynamoCommerceRepository";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import CommerceMother from "@backoffice-contexts/commerces/mothers/Commerce.mother";

describe(DynamoCommerceRepository, () => {
    const TABLE_NAME = "backoffice-jordi-sapes-backoffice-dynamodb-table",
        EMAIL_INDEX_NAME = "emailIndex";
    let client: DocumentClient;
    let repo: DynamoCommerceRepository;
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
        repo = new DynamoCommerceRepository(client, TABLE_NAME, EMAIL_INDEX_NAME);
    });

    it("should return when query by email", async () => {
        const commerce = CommerceMother.random();
        await repo.save(commerce);

        // eslint-disable-next-line one-var
        const found = await repo.findByEmail(commerce.email);

        expect(found)
            .toStrictEqual(commerce);
    });
    // TODO test by id and test when no exists
});
