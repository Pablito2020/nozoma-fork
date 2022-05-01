import { CommerceRepository } from '@backoffice-contexts/commerces/domain/CommerceRepository';
import Commerce from '@backoffice-contexts/commerces/domain/Commerce';
import UuidVo from '@shared/domain/UuidVo';
import CommerceNameVo from '@backoffice-contexts/commerces/domain/CommerceNameVo';
import EmailVo from '@shared/domain/EmailVo';
import CommerceDescriptionVo from '@backoffice-contexts/commerces/domain/CommerceDescriptionVo';
import PhoneVo from '@shared/domain/PhoneVo';
import AddressVo from '@shared/domain/AddressVo';
import { EventBus } from '@shared/domain/bus/event/EventBus';
import AlreadyExists from '@shared/domain/AlreadyExists';

export default class CommerceCreator {
    constructor(
        readonly repo: CommerceRepository,
        readonly eventBus: EventBus
    ) {}

    async run(
        id: UuidVo,
        name: CommerceNameVo,
        email: EmailVo,
        description: CommerceDescriptionVo,
        phone: PhoneVo,
        address: AddressVo,
    ): Promise<Commerce> {

        const commerce = Commerce.create(
                id,
                name,
                email,
                description,
                phone,
                address,
            ),
            [commerceByEmail, commerceById] = await Promise.all([
                this.repo.findByEmail(email),
                this.repo.findById(id)
            ])
        if(commerceByEmail || commerceById) {
            throw new AlreadyExists('Commerce with id '+id+ ' or email '+ email + ' already exists')
        }

        await this.repo.save(commerce)
        await this.eventBus.publish(commerce.pullDomainEvents())
        return commerce

    }

}
