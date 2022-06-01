import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import Product from "@pms-contexts/products/domain/Product";

export default class SearchProductResponse extends QueryResponse<Product> {
    readonly data: any;
}

