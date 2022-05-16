import faker from '@faker-js/faker';
import CommerceDescriptionVo from '@backoffice-contexts/commerces/domain/Commerce/CommerceDescriptionVo';

export default class CommerceDescriptionMother {
    static random() : CommerceDescriptionVo {
        return CommerceDescriptionMother.create(
            faker.lorem.sentence()
        )
    }
    static create(description: string) : CommerceDescriptionVo {
        return new CommerceDescriptionVo(description)
    }
}
