import faker from '@faker-js/faker';
import EmailVo from '@shared/domain/EmailVo';

export default class EmailMother {
    static random() : EmailVo {
        return EmailMother.create(
            faker.internet.email()
        )
    }
    static create(email: string) : EmailVo {
        return new EmailVo(email)
    }
}
