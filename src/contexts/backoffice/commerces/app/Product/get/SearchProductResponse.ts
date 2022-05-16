import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import Product from "@backoffice-contexts/commerces/domain/Product/Product";

export default class SearchProductResponse extends QueryResponse<Product> {
    readonly data: any;
}

