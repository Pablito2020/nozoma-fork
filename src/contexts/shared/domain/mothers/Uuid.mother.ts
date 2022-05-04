import UuidVo from '@shared/domain/UuidVo';

export default class UuidMother {
    static random() : UuidVo {
        return UuidMother.create(UuidVo.random().value)
    }

    static create(value: string) : UuidVo {
        return new UuidVo(value)
    }
}
