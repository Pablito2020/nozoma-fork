import {CommerceRepository} from "@backoffice-contexts/commerces/domain/CommerceRepository";
import UuidVo from "@shared/domain/UuidVo";
import Commerce from "@backoffice-contexts/commerces/domain/Commerce";


export default class CommerceGetter {
    constructor(
        readonly repo: CommerceRepository
    ) {

    }

    async run(
        id: UuidVo
    ): Promise<Commerce> {
        const commerce = await this.repo.findById(id);
        if (commerce === null)
            throw new Error("Commerce not found");
        return commerce;
    }
}