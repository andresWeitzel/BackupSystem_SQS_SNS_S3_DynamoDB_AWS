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
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";


//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let msg: string;
let code: number;
const MINING_PLANTS_TABLE_NAME = process.env.DYNAMO_MINING_PLANTS_TABLE_NAME;


/**
 * @description function in charge of inserting xml type files into dynamodb
 * @param {Object} event Object type
 * @returns the added object
 */
module.exports.insert = async (event: any) => {
    try {
        //Init

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---


        let eventBody = await formatToJson(event.body);
        let item;
        let ss;


        for (let i of eventBody) {

            item = {
                uuid: i.geom,
                nombre: i.nombre,
                empresa: i.empresa,
                tipo_yacimiento: (i.tipo_yacim ==null) ? "-" : i.tipo_yacim,
                estado_vigente: i.estado,
                mineral_principal: i.mineral_pr,
                geolocalizacion: i.geojson
            }
            ss = await insertItems(MINING_PLANTS_TABLE_NAME, item);
        }


        if (ss != null) {
            return await requestResult(statusCode.OK, ss);
        } else {
            return await requestResult(statusCode.BAD_REQUEST, 'Bad Request');
        }



    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in the insert function of the CRUD RECORDS lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};