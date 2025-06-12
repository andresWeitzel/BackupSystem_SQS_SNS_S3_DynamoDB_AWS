//External
const {
    UpdateCommand,
    GetCommand
} = require("@aws-sdk/lib-dynamodb");
// const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
//Helpers
import {
    dynamoDBClient
}  from "../config/dynamoDBClient";
//Const-vars 
let dynamo:any;
let metadata:any;
let itemUpdated:any;
let itemExists:any;


/**
 * @description update one item into the database
 * @param {String} tableName string type
 * @param {String} uuid string type
 * @param {Object} item any object json type
 * @returns a metadata with the information of the operation
 */
export const updateOneItem = async (tableName:string, uuid:string, item:any) => {
    try {
        itemUpdated = null;
        itemExists = null;
        const itemKeys = Object.keys(item);

        // Validate UUID
        if (!uuid || typeof uuid !== 'string' || uuid.trim() === '') {
            throw new Error('Invalid UUID provided');
        }

        dynamo = await dynamoDBClient();

        // First check if the item exists
        itemExists = await dynamo.send(new GetCommand({
            TableName: tableName,
            Key: {
                uuid: uuid
            }
        }));

        if (!itemExists.Item) {
            return null;
        }

        // Prepare expression attribute names
        const expressionAttributeNames = {
            ...itemKeys.reduce((accumulator, k, index) => ({
                ...accumulator,
                [`#field${index}`]: k
            }), {}),
            "#uuid": "uuid"
        };

        // If item exists, proceed with update
        metadata = await dynamo.send(new UpdateCommand({
            TableName: tableName,
            Key: {
                uuid: uuid
            },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: `SET ${itemKeys.map((k, index) => `#field${index} = :value${index}`).join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: itemKeys.reduce((accumulator, k, index) => ({
                ...accumulator,
                [`:value${index}`]: item[k]
            }), {}),
            ConditionExpression: "attribute_exists(#uuid)"
        }));

        if (metadata != null) {
            itemUpdated = metadata.Attributes;
        }

        return itemUpdated;

    } catch (error) {
        console.error(`ERROR in updateOneItem() function. Caused by ${error} . Specific stack is ${error.stack} `);
        throw error;
    }
}
