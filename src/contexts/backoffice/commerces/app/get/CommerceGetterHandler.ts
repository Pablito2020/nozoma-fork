import {QueryHandler} from "@shared/domain/bus/query/QueryHandler";
import CommerceGetter from "@backoffice-contexts/commerces/app/get/CommerceGetter";
import UuidVo from "@shared/domain/UuidVo";
import {Query} from "@shared/domain/bus/query/Query";
import GetCommerceQuery from "@backoffice-contexts/commerces/app/get/GetCommerceQuery";
import GetCommerceResponse from "@backoffice-contexts/commerces/app/get/GetCommerceResponse";

export default class CommerceGetterHandler implements QueryHandler<GetCommerceQuery, GetCommerceResponse> {

    constructor(private getter: CommerceGetter) {
    }

    async handle({id}: GetCommerceQuery): Promise<GetCommerceResponse> {
        const response = await this.getter.run(new UuidVo(id));
        return new GetCommerceResponse(response);
    }

    subscribedTo(): Query {
        return GetCommerceQuery;
    }

}