import Commerce from '@backoffice-contexts/commerces/domain/Commerce';
import { Nullable } from '@shared/domain/Nullable';
import UuidVo from '@shared/domain/UuidVo';
import EmailVo from '@shared/domain/EmailVo';

export interface CommerceRepository {
    save(commerce: Commerce) : Promise<void>
    findById(id: UuidVo) : Promise<Nullable<Commerce>>
    findByEmail(email: EmailVo) : Promise<Nullable<Commerce>>
}

