import InvalidArgumentError from '@shared/domain/invalid-argument-error';
import StringVo from '@shared/domain/string-vo';
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
