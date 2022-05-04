import MongoCommerceRepository from "@backoffice-contexts/commerces/infra/persistence/mongodb/MongoCommerceRepository";
import CommerceMother from "@backoffice-contexts/commerces/mothers/Commerce.mother";
import { MongoClient } from "mongodb";

describe(MongoCommerceRepository, () => {
    let repo: MongoCommerceRepository;
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
        repo = new MongoCommerceRepository(client.db());
    });
    afterAll(async () => {
        await client.close(true);
    });

    it("should find by id", async () => {
        const commerce = CommerceMother.random();

        await repo.save(commerce);

        // eslint-disable-next-line one-var
        const found = await repo.findById(commerce.id);

        expect(found)
            .toStrictEqual(commerce);
    });

    it("should find by email", async () => {
        const commerce = CommerceMother.random();

        await repo.save(commerce);

        // eslint-disable-next-line one-var
        const found = await repo.findByEmail(commerce.email);

        expect(found)
            .toStrictEqual(commerce);
    });

    // TODO test when item is not in BBDD
});
