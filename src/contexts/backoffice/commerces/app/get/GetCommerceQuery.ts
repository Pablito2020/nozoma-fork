import {Query} from "@shared/domain/bus/query/Query";

export default class GetCommerceQuery implements Query {
    constructor(readonly id: string) {}
}
