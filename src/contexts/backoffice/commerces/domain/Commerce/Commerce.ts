import Aggregate from '@shared/domain/Aggregate';
import UuidVo from '@shared/domain/UuidVo';
import PhoneVo from '@shared/domain/PhoneVo';
import CommerceNameVo from '@backoffice-contexts/commerces/domain/Commerce/CommerceNameVo';
import EmailVo from '@shared/domain/EmailVo';
import CommerceDescriptionVo from '@backoffice-contexts/commerces/domain/Commerce/CommerceDescriptionVo';
import AddressVo from '@shared/domain/AddressVo';
import { CommercePrimitives } from '@backoffice-contexts/commerces/domain/Commerce/CommercePrimitives';
import CommerceCreatedEvent from '@backoffice-contexts/commerces/domain/Commerce/CommerceCreatedEvent';
import CommerceDeletedEvent from "@backoffice-contexts/commerces/domain/Commerce/CommerceDeletedEvent";

export default class Commerce extends Aggregate {
    constructor(
        readonly id: UuidVo,
        readonly name: CommerceNameVo,
        readonly email: EmailVo,
        readonly description: CommerceDescriptionVo,
        readonly phone: PhoneVo,
        readonly address: AddressVo,
    ) {
        super();
    }

    static create(
        id: UuidVo,
        name: CommerceNameVo,
        email: EmailVo,
        description: CommerceDescriptionVo,
        phone: PhoneVo,
        address: AddressVo,
    ): Commerce {
        const commerce = new Commerce(
            id,
            name,
            email,
            description,
            phone,
            address,
        );
        commerce.record(new CommerceCreatedEvent(commerce.toPrimitives()));
        return commerce;
    }

    static fromPrimitives({
        address,
        phone,
        name,
        description,
        id,
        email
    }: CommercePrimitives): Commerce {
        return new Commerce(
            new UuidVo(id),
            new CommerceNameVo(name),
            new EmailVo(email),
            new CommerceDescriptionVo(description),
            new PhoneVo(phone),
            new AddressVo(address)
        )
    }

    toPrimitives(): CommercePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            email: this.email.value,
            description: this.description.value,
            phone: this.phone.value,
            address: this.address.value,
        };
    }

    delete(): void {
        this.record(new CommerceDeletedEvent(this.toPrimitives()))
    }

}
