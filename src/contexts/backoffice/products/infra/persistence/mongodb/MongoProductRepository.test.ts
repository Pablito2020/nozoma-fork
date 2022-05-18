import { MongoClient } from "mongodb";
import MongoProductRepository from "@backoffice-contexts/products/infra/persistence/mongodb/MongoProductRepository";
import ProductMother from "@backoffice-contexts/products/mothers/Product.mother";
import ProductCreator from "@backoffice-contexts/products/app/create/ProductCreator";
import Product from "@backoffice-contexts/products/domain/Product";
import UuidVo from "@shared/domain/UuidVo";
import ProductNameVo from "@backoffice-contexts/products/domain/ProductNameVo";
import ProductPriceVo from "@backoffice-contexts/products/domain/ProductPriceVo";
import ProductDescriptionVo from "@backoffice-contexts/products/domain/ProductDescriptionVo";

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

    it("should return 404", async () => {
        const product = new Product(
            new UuidVo("-1"),
            new UuidVo(""),
            new ProductNameVo(""),
            new ProductPriceVo(""),
            new ProductDescriptionVo(""))

        // eslint-disable-next-line one-var
        const error = repo.findById(product.id);

        expect(error).toStrictEqual(404)
    })
});
