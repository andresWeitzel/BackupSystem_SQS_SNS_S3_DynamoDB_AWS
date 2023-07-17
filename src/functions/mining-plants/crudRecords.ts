//Interfaces
import { MiningPlants } from "src/interfaces/MiningPlants";
//Enums
import { statusCode } from "src/enums/http/statusCode";
import { value } from "src/enums/general/values";
//Helpers
import { bodyResponse } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { formatToJson } from "src/helpers/format/formatToJson";
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
import { formatToBigint } from "src/helpers/format/formatToNumber";
import { getAllItems } from "src/helpers/dynamodb/operations/getAllItems";
//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let item: MiningPlants;
let itemTransactionResult: any;
let itemsTransactionResult:any;
let itemsList: Array<MiningPlants>;
let msg: string;
let code: number;
let pageSizeNro: number;
let orderAt: string;
let eventQueryStrParams: any;
let paramPageSizeNro: any;
let eventBody:any;
let paramOrderAt: any;
const MINING_PLANTS_TABLE_NAME = process.env.DYNAMO_MINING_PLANTS_TABLE_NAME;


/**
 * @description insert records into dynamo database
 * @param {Object} event Object type
 * @returns the added/s object/s
 */
module.exports.insert = async (event: any) => {
    try {
        //Init
        item = null;
        itemTransactionResult = null;
        itemsList = [];

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with db transaction  ---
        eventBody = await formatToJson(event.body);

        for (let i of eventBody) {

            item = {
                uuid: (i.geom == null || i.geom == '') ? "-" : i.geom,
                nombre: (i.nombre == null || i.nombre == '') ? "-" : i.nombre,
                empresa: (i.empresa == null || i.empresa == '') ? "-" : i.empresa,
                tipo_yacimiento: (i.tipo_yacim == null || i.tipo_yacim == '') ? "-" : i.tipo_yacim,
                estado_vigente: (i.estado == null || i.estado == '') ? "-" : i.estado,
                mineral_principal: (i.mineral_pr == null || i.mineral_pr == '') ? "-" : i.mineral_pr,
                geolocalizacion: (i.geojson == null || i.geojson == '') ? "-" : i.geojson
            }
            itemTransactionResult = await insertItems(MINING_PLANTS_TABLE_NAME, item);

            if (itemTransactionResult == undefined || itemTransactionResult == null) return;

            itemsList.push(item);
        }


        if (itemTransactionResult == value.IS_NULL || itemTransactionResult == value.IS_UNDEFINED || !(itemTransactionResult.length)) {
            return await bodyResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                "An error has occurred, the object has not been inserted into the database. Try again"
            );
        }

        return await bodyResponse(statusCode.OK, itemsList);
        //-- end with db transaction  ---

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in the insert function of the CRUD RECORDS lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }
};







/**
 * @description get all records from dynamo database
 * @param {Object} event Object type
 * @returns the all objects
 */
module.exports.getAll = async (event: any) => {
    try {
        //Init
        itemsTransactionResult = null;
        pageSizeNro = 5;
        orderAt = 'asc';

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != value.IS_NULL) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with pagination  ---
        eventQueryStrParams = await event.queryStringParameters;

        paramPageSizeNro = await formatToBigint(eventQueryStrParams.limit);

        paramOrderAt = eventQueryStrParams.orderAt;

        pageSizeNro =
            (paramPageSizeNro != value.IS_NULL &&
                paramPageSizeNro != value.IS_UNDEFINED &&
                !isNaN(paramPageSizeNro))
                ? paramPageSizeNro
                : pageSizeNro;
        orderAt =
            (paramOrderAt != value.IS_NULL &&
                paramOrderAt != value.IS_UNDEFINED &&
                isNaN(paramOrderAt))
                ? paramOrderAt
                : orderAt;

        //-- end with pagination  ---
        //-- start with db operations  ---
        itemsTransactionResult = await getAllItems(MINING_PLANTS_TABLE_NAME, pageSizeNro, orderAt);

        if (itemsTransactionResult == value.IS_NULL || !(itemsTransactionResult.length)) {
            return await bodyResponse(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not get a paginated mining plants list. Check if there are records in the database and try again"
            );
        }

        return await bodyResponse(statusCode.OK, itemsTransactionResult);
        //-- end with db operations  ---


    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in the getAll function of the CRUD RECORDS lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }
};