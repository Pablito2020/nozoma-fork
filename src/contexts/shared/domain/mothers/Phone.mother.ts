import PhoneVo from '@shared/domain/PhoneVo';
import faker from "@faker-js/faker";

export default class PhoneMother {

    private static SPAIN_PREFIX = '+34';
    
    static random() : PhoneVo {
        return PhoneMother.create(`${this.SPAIN_PREFIX}${faker.datatype.number({min: 100_000_000, max: 999_999_999})}`);
    }
    static create(phone: string) : PhoneVo {
        return new PhoneVo(phone)
    }
}