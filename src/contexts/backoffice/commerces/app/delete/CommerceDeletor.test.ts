/*import CommerceDeletor from "@backoffice-contexts/commerces/app/delete/CommerceDeletor";
import CommerceRepositoryMock from "@backoffice-contexts/commerces/__mocks__/CommerceRepository.mock";
import CommerceCreator from "@backoffice-contexts/commerces/app/create/CommerceCreator";
import EventBusMock from "@shared/__mocks__/EventBus.mock";
import CommerceCreatorHandler from "@backoffice-contexts/commerces/app/create/CommerceCreatorHandler";
import CommerceMother from "@backoffice-contexts/commerces/mothers/Commerce.mother";
import CreateCommerceCommandMother from "@backoffice-contexts/commerces/mothers/CreateCommerceCommand.mother";

describe (CommerceDeletor, () => {
    it('should delete the commerce with the corresponding id', async () => {
        const repo = new CommerceRepositoryMock(),
            creator = new CommerceCreator(repo, new EventBusMock()),
            handler = new CommerceCreatorHandler(creator),
            expected = CommerceMother.random(),
            command = CreateCommerceCommandMother.fromCommerce(expected);


    })
});*/