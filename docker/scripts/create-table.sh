#! /bin/bash
export AWS_ACCESS_KEY_ID="test"
export AWS_SECRET_ACCESS_KEY="test"
export AWS_ENDPOINT="http://localhost:4566/"
export AWS_REGION="eu-west-1"


aws dynamodb --endpoint-url=http://localhost:4566 create-table \
    --table-name nozoma-backoffice \
    --attribute-definitions \
        AttributeName=partitionKey,AttributeType=S \
        AttributeName=email,AttributeType=S \
    --key-schema \
        AttributeName=partitionKey,KeyType=HASH \
    --billing-mode \
        PAY_PER_REQUEST \
    --global-secondary-indexes  \
       "[
           {
               \"IndexName\": \"emailIndex\",
               \"KeySchema\": [
                   {\"AttributeName\":\"email\",\"KeyType\":\"HASH\"}
               ],
               \"Projection\": {
                   \"ProjectionType\":\"ALL\"
               }
           }
       ]" \


