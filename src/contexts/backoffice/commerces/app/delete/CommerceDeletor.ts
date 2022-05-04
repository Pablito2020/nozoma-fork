import {CommerceRepository} from "@backoffice-contexts/commerces/domain/CommerceRepository";
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
        const [commerceId] = await Promise.all([
            this.repo.findById(id)
        ]);
        if (!commerceId) {
            await this.repo.findById(id)
        }
    }
}