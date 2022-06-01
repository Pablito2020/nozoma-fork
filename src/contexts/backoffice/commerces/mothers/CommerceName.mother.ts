import CommerceNameVo from '@backoffice-contexts/commerces/domain/CommerceNameVo';
import faker from '@faker-js/faker';

export default class CommerceNameMother {
    static random() : CommerceNameVo {
        return CommerceNameMother.create(
            faker.lorem.words().substring(0, 10)
        )
    }
    static create(name: string) : CommerceNameVo {
        return new CommerceNameVo(name)
    }
}
