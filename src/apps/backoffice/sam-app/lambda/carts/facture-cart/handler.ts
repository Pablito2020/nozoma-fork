import {Context, SQSEvent} from "aws-lambda";
import FactureGeneratorHandler from "@backoffice-contexts/commerces/app/generate-facture/FactureGeneratorHandler";
import FactureGenerator from "@backoffice-contexts/commerces/app/generate-facture/FactureGenerator";
import GenerateFactureCommand from "@backoffice-contexts/commerces/app/generate-facture/GenerateFactureCommand";
import {CartPrimitive} from "@backoffice-contexts/commerces/domain/CartPrimitive";
import ProductSearcherHandler from "@backoffice-contexts/products/app/get/ProductSearcherHandler";
import CommerceSearcherHandler from "@backoffice-contexts/commerces/app/get/CommerceSearcherHandler";
import FactureCartParser from "@backoffice-contexts/commerces/app/generate-facture/Facture";
import DynamoProductRepository from "@backoffice-contexts/products/infra/persistence/dynamodb/DynamoProductRepository";
import DynamoCommerceRepository
    from "@backoffice-contexts/commerces/infra/persistence/dynamodb/DynamoCommerceRepository";
import SimplePrinterCart from "@backoffice-contexts/commerces/app/generate-facture/SimplePrinterCart";
import ConsoleLogger from "@shared/infra/ConsoleLogger";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import ProductSearcher from "@backoffice-contexts/products/app/get/ProductSearcher";
import CommerceSearcher from "@backoffice-contexts/commerces/app/get/CommerceSearcher";
import {ContainerBuilder} from "node-dependency-injection";
import {register as sharedRegister} from "../../shared/dependencies.di";

const container = new ContainerBuilder();
sharedRegister(container);

// eslint-disable-next-line one-var
const handler = async (event: SQSEvent, _context: Context): Promise<void> => {
    const messages = event.Records;
    for (const message of messages) {
        await doUseCaseForMessage(JSON.parse(message.body))
    }
}

async function doUseCaseForMessage(input: CartPrimitive) {
    const myHandler = new FactureGeneratorHandler(new FactureGenerator(
        new FactureCartParser(),
        new ProductSearcherHandler(new ProductSearcher(new DynamoProductRepository(new DocumentClient(),
                                                                                   process.env.TABLE_NAME as string,
                                                                                   "productId"),
        )),
        new CommerceSearcherHandler(new CommerceSearcher(new DynamoCommerceRepository(new DocumentClient(),
                                                                                            process.env.TABLE_NAME as string,
                                                                                      "emailIndex"),
        )),
        new SimplePrinterCart(new ConsoleLogger())
    ))
    await myHandler.handle(new GenerateFactureCommand(input))
}
export {handler}