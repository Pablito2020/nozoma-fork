import {Query} from "@shared/domain/bus/query/Query";

export default class SearchCommerceQuery implements Query {
    constructor(readonly id: string) {}
}
