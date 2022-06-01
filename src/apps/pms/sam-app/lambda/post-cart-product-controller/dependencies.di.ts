import {ContainerBuilder, Definition, Reference} from "node-dependency-injection";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import DynamoCartRepository from "@pms-contexts/carts/infra/persistence/dynamodb/DynamoCartRepository";
import CartProductAdder from "../../../../../contexts/pms/carts/app/add_product/CartProductAdder";
import CartProductAdderHandler from "../../../../../contexts/pms/carts/app/add_product/CartProductAdderHandler";
import QueryHandlersInformation from "@shared/infra/bus/query/QueryHandlersInformation";
import ProductSearcherHandler from "@pms-contexts/products/app/get/ProductSearcherHandler";
import SearchCartHandler from "@pms-contexts/carts/app/search/SearchCartHandler";
import CartSearcher from "@pms-contexts/carts/app/search/CartSearcher";
import DynamoProductRepository from "@pms-contexts/products/infra/persistence/dynamodb/DynamoCommerceRepository";
import ProductSearcher from "@pms-contexts/products/app/get/ProductSearcher";
import InMemoryQueryBus from "@shared/infra/bus/query/InMemoryQueryBus";

const CREATE_DEFINITIONS = {
        CartProductAdder: "CartProductAdder",
        CartRepository: "CartRepository",
        ProductRepository: "ProductRepository",
        QueryBus: "QueryBus",
        QueryHandlerInformation: "QueryHandlerInformation",
        Handler: "CartProductAdderHandler"
    },

    register = (container: ContainerBuilder): void => {

        container
            .register(CREATE_DEFINITIONS.ProductRepository, DynamoProductRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);

        container
            .register(CREATE_DEFINITIONS.CartRepository, DynamoCartRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);


        // Register Queries Handlers

        container.register(CREATE_DEFINITIONS.QueryHandlerInformation, QueryHandlersInformation)
            .addArgument([
                // eslint-disable-next-line max-len
                new ProductSearcherHandler(new ProductSearcher(new DynamoProductRepository(new DocumentClient(), process.env.TABLE_NAME as string, "emailIndex"))),
                // eslint-disable-next-line max-len
                new SearchCartHandler(new CartSearcher(new DynamoCartRepository(new DocumentClient(), process.env.TABLE_NAME as string)))
            ])

        container
            .register(CREATE_DEFINITIONS.QueryBus, InMemoryQueryBus)
            .addArgument(new Reference(CREATE_DEFINITIONS.QueryHandlerInformation));

        // creation

        container
            .register(CREATE_DEFINITIONS.CartProductAdder, CartProductAdder)
            .addArgument(new Reference(CREATE_DEFINITIONS.QueryBus))
            .addArgument(new Reference(CREATE_DEFINITIONS.CartRepository))

        const definition = new Definition(CartProductAdderHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.CartProductAdder));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
