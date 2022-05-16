import {QueryHandler} from "@shared/domain/bus/query/QueryHandler";
import UuidVo from "@shared/domain/UuidVo";
import {Query} from "@shared/domain/bus/query/Query";
import SearchProductQuery from "@backoffice-contexts/commerces/app/Product/get/SearchProductQuery";
import ProductSearcher from "@backoffice-contexts/commerces/app/Product/get/ProductSearcher";
import SearchProductResponse from "@backoffice-contexts/commerces/app/Product/get/SearchProductResponse";

export default class ProductSearcherHandler implements QueryHandler<SearchProductQuery, SearchProductResponse> {

    constructor(private getter: ProductSearcher) {
    }

    async handle({id}: SearchProductQuery): Promise<SearchProductResponse> {
        const response = await this.getter.run(new UuidVo(id));
        return new SearchProductResponse(response);
    }

    subscribedTo(): Query {
        return SearchProductQuery;
    }

}