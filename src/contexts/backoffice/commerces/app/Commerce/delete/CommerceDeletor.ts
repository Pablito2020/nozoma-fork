import {CommerceRepository} from "@backoffice-contexts/commerces/domain/Commerce/CommerceRepository";
import {EventBus} from "@shared/domain/bus/event/EventBus";
import UuidVo from "@shared/domain/UuidVo";

export default class CommerceDeletor {
    constructor(
        readonly repo: CommerceRepository,
        readonly eventBus: EventBus
    ) {
    }

    async run(
        id: UuidVo
    ): Promise<void> {
        const commerce = await this.repo.findById(id);
        if (commerce) {
            commerce.delete()
            await this.repo.delete(commerce)
            await this.eventBus.publish(commerce.pullDomainEvents());
        }
    }
}