import {Nullable} from '@shared/domain/Nullable';
import UuidVo from '@shared/domain/UuidVo';
import CartRepository from "@pms-contexts/carts/domain/CartRepository";
import Cart from "@pms-contexts/carts/domain/Cart";

export default class CartRepositoryMock implements CartRepository {

    readonly findByIdMock = jest.fn();
    readonly saveMock = jest.fn();
    readonly updateMock = jest.fn();

    findById(id: UuidVo): Promise<Nullable<Cart>> {
        return this.findByIdMock(id);
    }

    assertFindIdIsCalledWith(id: UuidVo): void {
        expect(this.findByIdMock)
            .toHaveBeenCalledWith(id);
    }

    whenFindByIdThenReturn(cart: Nullable<Cart>): void {
        this.findByIdMock.mockResolvedValue(cart);
    }

    save(cart: Cart): Promise<void> {
        return this.saveMock(cart);
    }

    assertSaveIsCalledWith(cart: Cart): void {
        expect(this.saveMock)
            .toHaveBeenCalledWith(cart);
    }

    assertSaveIsNotCalled(): void {
        expect(this.saveMock)
            .not
            .toHaveBeenCalled();
    }

    update(cart: Cart): Promise<Nullable<Cart>> {
        return this.updateMock(cart)
    }

    assertUpdateIsCalledWith(cart: Cart): void {
        expect(this.saveMock)
            .toHaveBeenCalledWith(cart);
    }

    assertUpdateIsNotCalled(): void {
        expect(this.updateMock)
            .not
            .toHaveBeenCalled();

    }
}
