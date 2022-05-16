import Commerce from '@backoffice-contexts/commerces/domain/Commerce';
import UuidVo from '@shared/domain/UuidVo';
import CommerceNameVo from '@backoffice-contexts/commerces/domain/CommerceNameVo';
import CommerceDescriptionVo from '@backoffice-contexts/commerces/domain/CommerceDescriptionVo';
import PhoneVo from '@shared/domain/PhoneVo';
import AddressVo from '@shared/domain/AddressVo';
import EmailVo from '@shared/domain/EmailVo';
import UuidMother from '@shared/domain/mothers/Uuid.mother';
import CommerceNameMother from '@backoffice-contexts/commerces/mothers/CommerceName.mother';
import CommerceDescriptionMother from '@backoffice-contexts/commerces/mothers/CommerceDescription.mother';
import EmailMother from '@shared/domain/mothers/Email.mother';
import PhoneMother from '@shared/domain/mothers/Phone.mother';
import AddressMother from '@shared/domain/mothers/Address.mother';

export default class CommerceMother {
    static random(): Commerce {
        return CommerceMother.create(
            UuidMother.random(),
            CommerceNameMother.random(),
            CommerceDescriptionMother.random(),
            EmailMother.random(),
            PhoneMother.random(),
            AddressMother.random(),
        );
    }

    static create(
        id: UuidVo,
        name: CommerceNameVo,
        description: CommerceDescriptionVo,
        email: EmailVo,
        phone: PhoneVo,
        address: AddressVo,
    ): Commerce {
        return new Commerce(
            id, name, email, description, phone, address,
        );
    }
}
