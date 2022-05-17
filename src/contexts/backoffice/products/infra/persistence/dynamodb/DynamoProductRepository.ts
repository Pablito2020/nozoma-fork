import { Nullable } from "@shared/domain/Nullable";
import Product from "@backoffice-contexts/products/domain/Product";
import UuidVo from "@shared/domain/UuidVo";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import {ProductRepository} from "@backoffice-contexts/products/domain/ProductRepository";
import {ProductPrimitives} from "@backoffice-contexts/products/domain/ProductPrimitives";

const composeKey = (id: UuidVo) => "product:" + id.toString();
export default class DynamoProductRepository implements ProductRepository {
    constructor(private client: DocumentClient, readonly tableName: string, readonly emailIndex: string) {
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findById(id: UuidVo): Promise<Nullable<Product>> {
        const key = composeKey(id),
            resp = await this.client.get({
                TableName: this.tableName,
                Key: {
                    partitionKey: key
                }
            })
                .promise();
        return resp.Item ? Product.fromPrimitives({ ...resp.Item } as ProductPrimitives) : null;
    }

    async save(product: Product): Promise<void> {
        const key = composeKey(product.id);
        await this.client.put({
            TableName: this.tableName,
            Item: {
                partitionKey: key,
                ...product.toPrimitives()
            }
        })
            .promise();
    }

}