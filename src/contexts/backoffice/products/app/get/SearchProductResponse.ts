import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import Product from "@backoffice-contexts/products/domain/Product";

export default class SearchProductResponse extends QueryResponse<Product> {
    readonly data: any;
}

