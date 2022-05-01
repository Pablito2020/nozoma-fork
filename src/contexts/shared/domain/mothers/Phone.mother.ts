import faker from '@faker-js/faker';
import PhoneVo from '@shared/domain/PhoneVo';

export default class PhoneMother {
    static random() : PhoneVo {
        return PhoneMother.create(
            faker.phone.phoneNumber()
        )
    }
    static create(phone: string) : PhoneVo {
        return new PhoneVo(phone)
    }
}
