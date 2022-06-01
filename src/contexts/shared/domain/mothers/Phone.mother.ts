import PhoneVo from '@shared/domain/PhoneVo';

export default class PhoneMother {

    private static SPAIN_PREFIX = 12;
    
    static random() : PhoneVo {
        return PhoneMother.create(`${this.SPAIN_PREFIX}${Math.floor(Math.random() * 1000000000)}`)
    }
    static create(phone: string) : PhoneVo {
        return new PhoneVo(phone)
    }
}
