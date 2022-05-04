import { CommerceRepository } from '@backoffice-contexts/commerces/domain/CommerceRepository';
import EmailVo from '@shared/domain/EmailVo';
import { Nullable } from '@shared/domain/Nullable';
import Commerce from '@backoffice-contexts/commerces/domain/Commerce';
import UuidVo from '@shared/domain/UuidVo';

export default class CommerceRepositoryMock implements CommerceRepository {
    delete(id: UuidVo): Promise<void> {
        throw new Error('Method not implemented.');
    }

    readonly findByIdMock = jest.fn();
    readonly findByEmailMock = jest.fn();
    readonly saveMock = jest.fn();

    findByEmail(email: EmailVo): Promise<Nullable<Commerce>> {
        return this.findByEmailMock(email);
    }

    assertFindByEmailIsCalledWith(email: EmailVo): void {
        expect(this.findByEmailMock)
            .toHaveBeenCalledWith(email);
    }

    whenFindByEmailThenReturn(commerce: Nullable<Commerce>): void {
        this.findByEmailMock.mockResolvedValue(commerce);
    }

    findById(id: UuidVo): Promise<Nullable<Commerce>> {
        return this.findByIdMock(id);
    }

    assertFindIdIsCalledWith(id: UuidVo): void {
        expect(this.findByIdMock)
            .toHaveBeenCalledWith(id);
    }

    whenFindByIdThenReturn(commerce: Nullable<Commerce>): void {
        this.findByIdMock.mockResolvedValue(commerce);
    }

    save(commerce: Commerce): Promise<void> {
        return this.saveMock(commerce);
    }

    assertSaveIsCalledWith(commerce: Commerce): void {
        expect(this.saveMock)
            .toHaveBeenCalledWith(commerce);
    }

    assertSaveIsNotCalled(): void {
        expect(this.saveMock)
            .not
            .toHaveBeenCalled();
    }

}
