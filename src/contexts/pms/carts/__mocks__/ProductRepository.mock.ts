import {Nullable} from '@shared/domain/Nullable';
import UuidVo from '@shared/domain/UuidVo';
import {ProductRepository} from "@pms-contexts/products/domain/ProductRepository";
import Product from "@pms-contexts/products/domain/Product";

export default class ProductRepositoryMock implements ProductRepository {

    readonly findByIdMock = jest.fn();
    readonly saveMock = jest.fn();

    findById(id: UuidVo): Promise<Nullable<Product>> {
        return this.findByIdMock(id);
    }

    assertFindIdIsCalledWith(id: UuidVo): void {
        expect(this.findByIdMock)
            .toHaveBeenCalledWith(id);
    }

    whenFindByIdThenReturn(product: Nullable<Product>): void {
        this.findByIdMock.mockResolvedValue(product);
    }

    save(product: Product): Promise<void> {
        return this.saveMock(product);
    }

    assertSaveIsCalledWith(product: Product): void {
        expect(this.saveMock)
            .toHaveBeenCalledWith(product);
    }

    assertSaveIsNotCalled(): void {
        expect(this.saveMock)
            .not
            .toHaveBeenCalled();
    }

}
