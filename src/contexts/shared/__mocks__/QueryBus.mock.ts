/* eslint-disable jest/no-standalone-expect */


import Cart from "@pms-contexts/carts/domain/Cart";
import {QueryBus} from "@shared/domain/bus/query/QueryBus";
import {Query} from "@shared/domain/bus/query/Query";
import QueryResponse from "@shared/domain/bus/query/QueryResponse";
import SearchCartQuery from "@pms-contexts/carts/app/search/SearchCartQuery";
import SearchProductQuery from "@backoffice-contexts/products/app/get/SearchProductQuery";
import Product from "@pms-contexts/products/domain/Product";
import SearchProductResponse from "@backoffice-contexts/products/app/get/SearchProductResponse";
import SearchCartResponse from "@pms-contexts/carts/app/search/SearchCartResponse";
import CartDoesNotExist from "@pms-contexts/carts/domain/CartDoesNotExist";
import ProductDoesNotExist from "@pms-contexts/carts/domain/ProductDoesNotExist";

export default class QueryBusMock implements QueryBus {

    readonly askMockProduct = jest.fn();
    readonly askMockCart = jest.fn();
    shouldThrowCartDoesNotExist = false;
    shouldThrowProductDoesNotExist = false;

    async ask<T extends QueryResponse<any>>(query: Query): Promise<T> {
        if (this.shouldThrowCartDoesNotExist)
            throw new CartDoesNotExist();
        if (this.shouldThrowProductDoesNotExist)
            throw new ProductDoesNotExist();
        if (query instanceof SearchCartQuery)
            return await this.askMockCart(query)
        if (query instanceof SearchProductQuery) {
            return await this.askMockProduct(query)
        }
        throw new Error(`Mock for query: ${query} not found`);
    }

    assertQueryCartIsAskedFor(query: Query): void {
        expect(this.askMockCart)
            .toHaveBeenCalledWith(query);
    }

    whenFindByQueryCartThenReturn(cart: Cart): void {
        this.askMockCart.mockResolvedValue(new SearchCartResponse(cart));
    }

    assertQueryProductIsAskedFor(query: Query): void {
        expect(this.askMockProduct)
            .toHaveBeenCalledWith(query);
    }

    whenFindByQueryProductThenReturn(product: Product): void {
        this.askMockProduct.mockResolvedValue(new SearchProductResponse(product));
    }

    whenFindByQueryCartThrowException() {
        this.shouldThrowCartDoesNotExist = true;
    }

    whenFindByQueryProductThrowException() {
        this.shouldThrowProductDoesNotExist = true;
    }
}
