import { CommerceRepository } from "@backoffice-contexts/commerces/domain/CommerceRepository";
import EmailVo from "@shared/domain/EmailVo";
import { Nullable } from "@shared/domain/Nullable";
import Commerce from "@backoffice-contexts/commerces/domain/Commerce";
import UuidVo from "@shared/domain/UuidVo";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { CommercePrimitives } from "@backoffice-contexts/commerces/domain/CommercePrimitives";

const composeKey = (id: UuidVo) => "commerce:" + id.toString();
export default class DynamoCommerceRepository implements CommerceRepository {
    constructor(private client: DocumentClient, readonly tableName: string, readonly emailIndex: string) {
    }

    async findByEmail(email: EmailVo): Promise<Nullable<Commerce>> {
        const resp = await this.client.query({
            TableName: this.tableName,
            IndexName: this.emailIndex,
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email.value
            }
        })
            .promise();
        return resp.Items?.length ? Commerce.fromPrimitives(
            {
                ...resp.Items[0] as CommercePrimitives
            }
        ) : null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findById(id: UuidVo): Promise<Nullable<Commerce>> {
        const key = composeKey(id),
            resp = await this.client.get({
                TableName: this.tableName,
                Key: {
                    partitionKey: key,
                    sortKey: key
                }
            })
                .promise();
        return resp.Item ? Commerce.fromPrimitives({ ...resp.Item } as CommercePrimitives) : null;
    }

    async save(commerce: Commerce): Promise<void> {
        const key = composeKey(commerce.id);
        await this.client.put({
            TableName: this.tableName,
            Item: {
                partitionKey: key,
                sortKey: key,
                ...commerce.toPrimitives()
            }
        })
            .promise();
    }

}
