/*import { MongoClient } from "mongodb";
import MongoProductRepository from "@backoffice-contexts/products/infra/persistence/mongodb/MongoProductRepository";
import ProductMother from "@backoffice-contexts/products/mothers/Product.mother";

describe(MongoProductRepository, () => {
    let repo: MongoProductRepository;
    let client: MongoClient;
    beforeAll(async () => {
        const user = "mongo_username",
            pwd = "mongo_pwd",
            url = "mongodb://" + user + ":" + pwd + "@localhost:27017",
            client = new MongoClient(url, {
                useUnifiedTopology: true,
                ignoreUndefined: true
            });
        await client.connect();
        repo = new MongoProductRepository(client.db());
    });
    afterAll(async () => {
        await client.close(true);
    });

    it("should find by id", async () => {
        const product = ProductMother.random();

        await repo.save(product);

        // eslint-disable-next-line one-var
        const found = await repo.findById(product.id);

        expect(found)
            .toStrictEqual(product);
    });
    // TODO test when item is not in BBDD
});
*/