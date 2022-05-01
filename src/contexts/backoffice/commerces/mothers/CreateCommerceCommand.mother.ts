import CreateCommerceCommand from '@backoffice-contexts/commerces/app/create/CreateCommerceCommand';
import Commerce from '@backoffice-contexts/commerces/domain/Commerce';

export default class CreateCommerceCommandMother {
    static fromCommerce(commerce: Commerce): CreateCommerceCommand {
        const {
            id,
            description,
            email,
            phone,
            name,
            address,
        } = commerce.toPrimitives();
        return new CreateCommerceCommand(
            id, name, email, description, phone, address,
        );
    }
}
