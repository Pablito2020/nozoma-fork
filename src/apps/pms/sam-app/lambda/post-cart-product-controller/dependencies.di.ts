import { ContainerBuilder, Definition, Reference } from "node-dependency-injection";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DEFINITIONS } from "../shared/dependencies.di";
import DynamoCartRepository from "@pms-contexts/carts/infra/persistence/dynamodb/DynamoCartRepository";
import DynamoProductRepository from "../../../../../contexts/pms/products/infra/persistence/dynamodb/DynamoCommerceRepository";
import CartProductAdder from "../../../../../contexts/pms/carts/app/add_product/CartProductAdder";
import CartProductAdderHandler from "../../../../../contexts/pms/carts/app/add_product/CartProductAdderHandler";

const CREATE_DEFINITIONS = {
        CartProductAdder: "CartProductAdder",
        CartRepository: "CartRepository",
        ProductRepository: "ProductRepository",
        Handler: "CartProductAdderHandler"
    },

    register = (container: ContainerBuilder): void => {
        container
            .register(CREATE_DEFINITIONS.CartRepository, DynamoCartRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);

        container
            .register(CREATE_DEFINITIONS.ProductRepository, DynamoProductRepository)
            .addArgument(new DocumentClient())
            .addArgument(process.env.TABLE_NAME);

        // creation
        container
            .register(CREATE_DEFINITIONS.CartProductAdder, CartProductAdder)
            .addArgument(new Reference(CREATE_DEFINITIONS.CartRepository))
            .addArgument(new Reference(CREATE_DEFINITIONS.ProductRepository));

        const definition = new Definition(CartProductAdderHandler);
        definition.addArgument(new Reference(CREATE_DEFINITIONS.CartProductAdder));
        definition.addTag(DEFINITIONS.Tags.CommandHandler);
        container.setDefinition(CREATE_DEFINITIONS.Handler, definition);

    };

export { register, CREATE_DEFINITIONS };
