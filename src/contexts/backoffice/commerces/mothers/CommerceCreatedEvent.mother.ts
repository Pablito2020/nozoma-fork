import CommerceCreatedEvent from '@backoffice-contexts/commerces/domain/Commerce/CommerceCreatedEvent';
import Commerce from '@backoffice-contexts/commerces/domain/Commerce/Commerce';

export default class CommerceCreatedEventMother {
    static fromCommerce(commerce: Commerce): CommerceCreatedEvent {
        return new CommerceCreatedEvent(commerce.toPrimitives());
    }
}
