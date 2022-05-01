import InvalidArgumentError from '@shared/domain/InvalidArgumentError';
import StringVo from '@shared/domain/StringVo';
import { v4 } from 'uuid';
import validate from 'uuid-validate';

export default class UuidVo extends StringVo {
    constructor(value: string) {
        UuidVo.ensureIsValidUuid(value);
        super(value);
    }

    static random(): UuidVo {
        return new UuidVo(v4());
    }

    private static ensureIsValidUuid(id: string): void {
        if (!validate(id)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
        }
    }

    equalsTo(other: UuidVo): boolean {
        return super.equalsTo(other);
    }
}
