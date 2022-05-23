import UuidVo from "@shared/domain/UuidVo";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Cart from "@pms-contexts/carts/domain/Cart";
import CartRepository from "@pms-contexts/carts/domain/CartRepository";

const composeKey = (id: UuidVo) => "cart:" + id.toString();
export default class DynamoCartRepository implements CartRepository {
    constructor(private client: DocumentClient, readonly tableName: string, readonly emailIndex: string) {
    }
    async save(cart: Cart): Promise<void> {
        const key = composeKey(cart.id);
        await this.client.put({
            TableName: this.tableName,
            Item: {
                partitionKey: key,
                ...cart.toPrimitives()
            }
        })
            .promise();
    }

}
