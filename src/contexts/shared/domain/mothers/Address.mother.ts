import faker from '@faker-js/faker';
import AddressVo from '@shared/domain/AddressVo';

export default class AddressMother {
    static random() : AddressVo {
        return AddressMother.create(
            faker.address.streetAddress()
        )
    }
    static create(name: string) : AddressVo {
        return new AddressVo(name)
    }
}
