import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import Commerce from "@backoffice-contexts/commerces/domain/Commerce";

export default class SearchCommerceResponse extends QueryResponse<Commerce> {
    readonly data: any;
}

