import {Query} from "@shared/domain/bus/query/Query";

export default class SearchProductQuery implements Query {
    constructor(readonly id: string) {}
}
