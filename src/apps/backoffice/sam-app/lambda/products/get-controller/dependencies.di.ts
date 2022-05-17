import {ContainerBuilder, Definition, Reference} from "node-dependency-injection";
import {DEFINITIONS} from "../../shared/dependencies.di";
import ProductSearcher from "@backoffice-contexts/products/app/get/ProductSearcher";
import DynamoProductRepository from "@backoffice-contexts/products/infra/persistence/dynamodb/DynamoProductRepository";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import ProductSearcherHandler from "@backoffice-contexts/products/app/get/ProductSearcherHandler";


const SEARCHER_DEFINITIONS = {
        ProductSearcher: "ProductSearcher",
        ProductRepository: "ProductRepository",
        Handler: "ProductSearcherHandler"
    },


    register = (container: ContainerBuilder): void => {
        container.register(SEARCHER_DEFINITIONS.ProductRepository, DynamoProductRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME)
            .addArgument("productId");
        
        container.register(SEARCHER_DEFINITIONS.ProductSearcher, ProductSearcher)
            .addArgument(new Reference(SEARCHER_DEFINITIONS.ProductRepository));


        const definition = new Definition(ProductSearcherHandler);
        definition.addArgument(new Reference(SEARCHER_DEFINITIONS.ProductSearcher));
        definition.addTag(DEFINITIONS.Tags.QueryHandler);
        container.setDefinition(SEARCHER_DEFINITIONS.Handler, definition);
    };

export {register, SEARCHER_DEFINITIONS};

