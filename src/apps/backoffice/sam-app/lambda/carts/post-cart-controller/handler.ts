import {Context, SQSEvent} from "aws-lambda";
import FactureGeneratorHandler from "@backoffice-contexts/commerces/app/generate-facture/FactureGeneratorHandler";
import FactureGenerator from "@backoffice-contexts/commerces/app/generate-facture/FactureGenerator";
import GenerateFactureCommand from "@backoffice-contexts/commerces/app/generate-facture/GenerateFactureCommand";

const handler = async (event: SQSEvent, _context: Context): Promise<void> => {
    const messages = event.Records;
    for(const message of messages) {
        doUseCaseForMessage(JSON.parse(message.body))
    }
}

function doUseCaseForMessage(input: Cart) {
    const myHandler = new FactureGeneratorHandler(new FactureGenerator())
    myHandler.handle(new GenerateFactureCommand(input))
}
export {handler}