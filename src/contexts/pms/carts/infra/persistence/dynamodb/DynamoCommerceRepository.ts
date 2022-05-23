import UuidVo from "@shared/domain/UuidVo";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Product from "@pms-contexts/products/domain/Product";
import {ProductRepository} from "@pms-contexts/products/domain/ProductRepository";

const composeKey = (id: UuidVo) => "product:" + id.toString();
export default class DynamoProductRepository implements ProductRepository {
    constructor(private client: DocumentClient, readonly tableName: string, readonly emailIndex: string) {
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
