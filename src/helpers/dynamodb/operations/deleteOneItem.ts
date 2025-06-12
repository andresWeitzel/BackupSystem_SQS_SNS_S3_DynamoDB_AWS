//External
const {
    DeleteCommand,
    GetCommand
} = require("@aws-sdk/lib-dynamodb");
//Helpers
import {
    dynamoDBClient
}  from "../config/dynamoDBClient";
//Const-vars 
let dynamo:any;
let metadata:any;
let itemDeleted:any;
let itemExists:any;

/**
 * @description delete one item from dynamo database
 * @param {string} tableName table name
 * @param {string} uuid uuid to delete
 * @returns the deleted object
 */
export const deleteOneItem = async (tableName: string, uuid: string) => {
    try {
        itemDeleted = null;
        itemExists = null;

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

        // If item exists, proceed with deletion
        metadata = await dynamo.send(new DeleteCommand({
            TableName: tableName,
            Key: {
                uuid: uuid
            },
            ReturnValues: "ALL_OLD",
            ConditionExpression: "attribute_exists(#uuid)",
            ExpressionAttributeNames: {
                "#uuid": "uuid"
            }
        }));

        if (metadata != null) {
            itemDeleted = metadata.Attributes;
        }

        return itemDeleted;

    } catch (error) {
        console.error(`Error in deleteOneItem function. Caused by ${error}`);
        throw error;
    }
}; 