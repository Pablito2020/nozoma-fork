import {QueryHandler} from "@shared/domain/bus/query/QueryHandler";
import CommerceSearcher from "@backoffice-contexts/commerces/app/get/CommerceSearcher";
import UuidVo from "@shared/domain/UuidVo";
import {Query} from "@shared/domain/bus/query/Query";
import SearchCommerceQuery from "@backoffice-contexts/commerces/app/get/SearchCommerceQuery";
import SearchCommerceResponse from "@backoffice-contexts/commerces/app/get/SearchCommerceResponse";

export default class CommerceSearcherHandler implements QueryHandler<SearchCommerceQuery, SearchCommerceResponse> {

    constructor(private getter: CommerceSearcher) {
    }

    async handle({id}: SearchCommerceQuery): Promise<SearchCommerceResponse> {
        const response = await this.getter.run(new UuidVo(id));
        return new SearchCommerceResponse(response);
    }

    subscribedTo(): Query {
        return SearchCommerceQuery;
    }

}