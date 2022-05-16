import CommerceCreator from '@backoffice-contexts/commerces/app/Commerce/create/CommerceCreator';
import CommerceRepositoryMock from '@backoffice-contexts/commerces/__mocks__/CommerceRepository.mock';
import CommerceCreatorHandler from '@backoffice-contexts/commerces/app/Commerce/create/CommerceCreatorHandler';
import EventBusMock from '@shared/__mocks__/EventBus.mock';
import CommerceMother from '@backoffice-contexts/commerces/mothers/Commerce.mother';
import CreateCommerceCommandMother from '@backoffice-contexts/commerces/mothers/CreateCommerceCommand.mother';
import AlreadyExists from '@shared/domain/AlreadyExists';
import CommerceCreatedEventMother from '@backoffice-contexts/commerces/mothers/CommerceCreatedEvent.mother';

describe(CommerceCreator, () => {
    it('should throw AlreadyExists when commerce with same email already exists', async () => {
        const repo = new CommerceRepositoryMock(),
            creator = new CommerceCreator(repo, new EventBusMock()),
            handler = new CommerceCreatorHandler(creator),
            expected = CommerceMother.random(),
            command = CreateCommerceCommandMother.fromCommerce(expected);

        repo.whenFindByIdThenReturn(null);
        repo.whenFindByEmailThenReturn(expected);

        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(AlreadyExists);

        repo.assertFindByEmailIsCalledWith(expected.email);
        repo.assertFindIdIsCalledWith(expected.id);
        repo.assertSaveIsNotCalled();

    });
    it('should fail when commerce with same email fail', async () => {
        const repo = new CommerceRepositoryMock(),
            creator = new CommerceCreator(repo, new EventBusMock()),
            handler = new CommerceCreatorHandler(creator),
            expected = CommerceMother.random(),
            command = CreateCommerceCommandMother.fromCommerce(expected);

        repo.whenFindByIdThenReturn(expected);
        repo.whenFindByEmailThenReturn(null);

        await expect(handler.handle(command))
            .rejects
            .toBeInstanceOf(AlreadyExists);

        repo.assertFindByEmailIsCalledWith(expected.email);
        repo.assertFindIdIsCalledWith(expected.id);
        repo.assertSaveIsNotCalled();
    });
    it('should create a new commerce', async () => {
        const repo = new CommerceRepositoryMock(),
            creator = new CommerceCreator(repo, new EventBusMock()),
            handler = new CommerceCreatorHandler(creator),
            expected = CommerceMother.random(),
            command = CreateCommerceCommandMother.fromCommerce(expected);

        repo.whenFindByIdThenReturn(null);
        repo.whenFindByEmailThenReturn(null);

        // eslint-disable-next-line one-var
        const response = await handler.handle(command);

        repo.assertFindByEmailIsCalledWith(expected.email);
        repo.assertFindIdIsCalledWith(expected.id);
        repo.assertSaveIsCalledWith(expected);

        expect(response.data)
            .toStrictEqual(expected);
    });

    it('should publish CommerceCreatedEvent', async () => {
        const repo = new CommerceRepositoryMock(),
            eventBus = new EventBusMock(),
            creator = new CommerceCreator(repo, eventBus),
            handler = new CommerceCreatorHandler(creator),
            commerce = CommerceMother.random(),
            command = CreateCommerceCommandMother.fromCommerce(commerce),
            expected = CommerceCreatedEventMother.fromCommerce(commerce);

        repo.whenFindByIdThenReturn(null);
        repo.whenFindByEmailThenReturn(null);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expected);
    });

});
