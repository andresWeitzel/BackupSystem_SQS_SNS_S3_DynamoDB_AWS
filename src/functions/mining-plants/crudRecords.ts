//Interfaces
import { MiningPlants } from "src/interfaces/MiningPlants";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { bodyResponse } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { formatToJson } from "src/helpers/format/formatToJson";
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
import { formatToBigint } from "src/helpers/format/formatToNumber";
import { getAllItems } from "src/helpers/dynamodb/operations/getAllItems";
import { getOneItem } from "src/helpers/dynamodb/operations/getOneItem";
import { updateOneItem } from "src/helpers/dynamodb/operations/updateOneItem";
import { deleteOneItem } from "src/helpers/dynamodb/operations/deleteOneItem";
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

        if (checkEventHeadersAndKeys != null) {
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


        if (itemTransactionResult == null || itemTransactionResult == undefined || !(itemTransactionResult.length)) {
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

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with pagination  ---
        eventQueryStrParams = await event.queryStringParameters;

        paramPageSizeNro = await formatToBigint(eventQueryStrParams.limit);

        paramOrderAt = eventQueryStrParams.orderAt;

        pageSizeNro =
            (paramPageSizeNro != null &&
                paramPageSizeNro != undefined &&
                !isNaN(paramPageSizeNro))
                ? paramPageSizeNro
                : pageSizeNro;
        orderAt =
            (paramOrderAt != null &&
                paramOrderAt != undefined &&
                isNaN(paramOrderAt))
                ? paramOrderAt
                : orderAt;

        //-- end with pagination  ---
        //-- start with db operations  ---
        itemsTransactionResult = await getAllItems(MINING_PLANTS_TABLE_NAME, pageSizeNro, orderAt);

        if (itemsTransactionResult == null || !(itemsTransactionResult.length)) {
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

/**
 * @description get one record by id from dynamo database
 * @param {Object} event Object type
 * @returns the requested object
 */
module.exports.getById = async (event: any) => {
    try {
        //Init
        itemTransactionResult = null;
        let uuid: string;

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with path parameters  ---
        uuid = event.pathParameters.uuid;

        if (uuid == null || uuid == undefined || uuid == '') {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, the uuid parameter is required"
            );
        }
        //-- end with path parameters  ---

        //-- start with db operations  ---
        itemTransactionResult = await getOneItem(MINING_PLANTS_TABLE_NAME, uuid);

        if (itemTransactionResult == null || itemTransactionResult == undefined) {
            return await bodyResponse(
                statusCode.NOT_FOUND,
                "Not found, the mining plant with the specified uuid does not exist"
            );
        }

        return await bodyResponse(statusCode.OK, itemTransactionResult);
        //-- end with db operations  ---

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in the getById function of the CRUD RECORDS lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }
};

/**
 * @description update one record by id in dynamo database
 * @param {Object} event Object type
 * @returns the updated object
 */
module.exports.update = async (event: any) => {
    try {
        //Init
        itemTransactionResult = null;
        let uuid: string;
        let updateData: any;

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with path parameters and body  ---
        uuid = event.pathParameters.uuid;
        updateData = await formatToJson(event.body);

        if (uuid == null || uuid == undefined || uuid == '') {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, the uuid parameter is required"
            );
        }

        if (updateData == null || updateData == undefined) {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, the update data is required"
            );
        }
        //-- end with path parameters and body  ---

        //-- start with db operations  ---
        itemTransactionResult = await updateOneItem(MINING_PLANTS_TABLE_NAME, uuid, updateData);

        if (itemTransactionResult == null || itemTransactionResult == undefined) {
            return await bodyResponse(
                statusCode.NOT_FOUND,
                "Not found, the mining plant with the specified uuid does not exist"
            );
        }

        return await bodyResponse(statusCode.OK, itemTransactionResult);
        //-- end with db operations  ---

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in the update function of the CRUD RECORDS lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }
};

/**
 * @description delete one record by id from dynamo database
 * @param {Object} event Object type
 * @returns message indicating if the record was deleted or not
 */
module.exports.delete = async (event: any) => {
    try {
        //Init
        itemTransactionResult = null;
        let uuid: string;
        let responseMessage: string;

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }
        //-- end with validation headers and keys  ---

        //-- start with path parameters  ---
        uuid = event.pathParameters.uuid;

        if (uuid == null || uuid == undefined || uuid == '') {
            return await bodyResponse(
                statusCode.BAD_REQUEST,
                "Bad request, the uuid parameter is required"
            );
        }
        //-- end with path parameters  ---

        //-- start with db operations  ---
        itemTransactionResult = await deleteOneItem(MINING_PLANTS_TABLE_NAME, uuid);

        if (itemTransactionResult == null || itemTransactionResult == undefined) {
            return await bodyResponse(
                statusCode.NOT_FOUND,
                "Not found, the mining plant with the specified uuid does not exist"
            );
        }

        responseMessage = `The mining plant "${itemTransactionResult.nombre}" was successfully deleted`;
        return await bodyResponse(statusCode.OK, responseMessage);
        //-- end with db operations  ---

    } catch (error) {
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `Error in the delete function of the CRUD RECORDS lambda. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await bodyResponse(code, msg);
    }
};