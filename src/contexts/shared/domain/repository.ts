import Aggregate from '@shared/domain/aggregate';
import { Nullable } from '@shared/domain/nullable';
import UuidVo from '@shared/domain/uuid-vo';

export interface Repository<T extends Aggregate, K extends UuidVo> {
    create(aggregate: T): Promise<void>;

    update(aggregate: T): Promise<void>;

    search(id: K): Promise<Nullable<T>>;

    delete(id: K): Promise<void>;
}
