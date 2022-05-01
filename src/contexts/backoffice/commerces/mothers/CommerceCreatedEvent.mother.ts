import CommerceCreatedEvent from '@backoffice-contexts/commerces/domain/CommerceCreatedEvent';
import Commerce from '@backoffice-contexts/commerces/domain/Commerce';

export default class CommerceCreatedEventMother {
    static fromCommerce(commerce: Commerce): CommerceCreatedEvent {
        return new CommerceCreatedEvent(commerce.toPrimitives());
    }
}
