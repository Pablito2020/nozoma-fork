import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import Cart from "@pms-contexts/carts/domain/Cart";

export default class SearchCartResponse extends QueryResponse<Cart> {
    readonly data: any;
}
