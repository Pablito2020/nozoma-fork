import Commerce from '@backoffice-contexts/commerces/domain/Commerce';
import GetCommerceQuery from "@backoffice-contexts/commerces/app/get/GetCommerceQuery";

export default class GetCommerceQueryMother {
    static fromCommerce(commerce: Commerce): GetCommerceQuery {
        const {id} = commerce.toPrimitives();
        return new GetCommerceQuery(id);
    }
}
