//External
import { PutCommand } from "@aws-sdk/lib-dynamodb";
//Helpers
import {
    dynamoDBClient
}  from "../config/dynamoDBClient";
//Const-vars 
let dynamo:any;
let metadata:any;
let requestId:any;


/**
 * @description insert one item into the database
* @param {String} tableName string type
 * @param {Object} items object json type
 * @returns a metadata with the information of the operation
 */
export const insertItems = async (tableName:string,items:any) => {
    try {

        requestId=null;
        dynamo = await dynamoDBClient();

        metadata = await dynamo.send(new PutCommand({
            TableName: tableName,
            Item : items
        }));
        
        if(metadata!=null){
            requestId = metadata.$metadata.requestId;
        }

        return requestId;

    } catch (error) {
        console.error(`ERROR in insertItems() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}
