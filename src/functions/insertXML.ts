//Enums
import { statusCode } from "src/enums/http/statusCode";
import { value } from "src/enums/general/values";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { formatToJson } from "src/helpers/format/formatToJson";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { validateObject } from "src/helpers/validations/models/validateObject";
import { formatToBigint } from "src/helpers/format/formatToNumber";


//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let msg: string;
let code: number;
const PAYMENTS_TABLE_NAME = process.env.DYNAMO_PAYMENTS_TABLE_NAME;


/**
 * @description function in charge of inserting xml type files into dynamodb
 * @param {Object} event Object type
 * @returns the added object
 */
module.exports.handler = async (event: any) => {
    try {
        //Init



        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        return await requestResult(statusCode.OK, 'ok');


    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in INSERT XML lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};