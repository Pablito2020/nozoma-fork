import {QueryHandler} from "@shared/domain/bus/query/QueryHandler";
import UuidVo from "@shared/domain/UuidVo";
import {Query} from "@shared/domain/bus/query/Query";
import SearchProductQuery from "@pms-contexts/products/app/get/SearchProductQuery";
import ProductSearcher from "@pms-contexts/products/app/get/ProductSearcher";
import SearchProductResponse from "@pms-contexts/products/app/get/SearchProductResponse";

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