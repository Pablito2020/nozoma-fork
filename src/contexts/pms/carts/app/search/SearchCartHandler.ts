import {QueryHandler} from "@shared/domain/bus/query/QueryHandler";
import UuidVo from "@shared/domain/UuidVo";
import {Query} from "@shared/domain/bus/query/Query";
import SearchCartResponse from "@pms-contexts/carts/app/search/SearchCartResponse";
import SearchCartQuery from "@pms-contexts/carts/app/search/SearchCartQuery";
import CartSearcher from "@pms-contexts/carts/app/search/CartSearcher";

export default class SearchCartHandler implements QueryHandler<SearchCartQuery, SearchCartResponse> {

    constructor(private getter: CartSearcher) {}

    async handle({id}: SearchCartQuery): Promise<SearchCartResponse> {
        const response = await this.getter.run(new UuidVo(id));
        return new SearchCartResponse(response);
    }

    subscribedTo(): Query {
        return SearchCartQuery;
    }

}
