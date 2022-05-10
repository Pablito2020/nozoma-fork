import Commerce from '@backoffice-contexts/commerces/domain/Commerce';
import SearchCommerceQuery from "@backoffice-contexts/commerces/app/get/SearchCommerceQuery";

export default class SearchCommerceQueryMother {
    static fromCommerce(commerce: Commerce): SearchCommerceQuery {
        const {id} = commerce.toPrimitives();
        return new SearchCommerceQuery(id);
    }
}
