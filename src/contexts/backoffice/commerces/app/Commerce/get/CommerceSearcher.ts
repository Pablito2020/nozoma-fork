import {CommerceRepository} from "@backoffice-contexts/commerces/domain/Commerce/CommerceRepository";
import UuidVo from "@shared/domain/UuidVo";
import Commerce from "@backoffice-contexts/commerces/domain/Commerce/Commerce";
import NotExistCommerceException from "@backoffice-contexts/commerces/domain/Commerce/NotExistsCommerce";


export default class CommerceSearcher {
    constructor(
        readonly repo: CommerceRepository
    ) {

    }

    async run(
        id: UuidVo
    ): Promise<Commerce> {
        const commerce = await this.repo.findById(id);
        if (commerce === null)
            throw new NotExistCommerceException("Commerce not found: " + id);
        return commerce;
    }
}