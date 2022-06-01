import {Query} from "@shared/domain/bus/query/Query";

export default class SearchCartQuery implements Query {
    constructor(readonly id: string) {}
}
