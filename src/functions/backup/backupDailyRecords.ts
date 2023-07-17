//Interfaces
import { MiningPlants } from "src/interfaces/MiningPlants";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { bodyResponse } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { formatToJson } from "src/helpers/format/formatToJson";
import { insertItems } from "src/helpers/dynamodb/operations/insertItems";
//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let item: MiningPlants;
let itemTransactionResult:any;
let itemsList: Array<MiningPlants>;
let msg: string;
let code: number;
const MINING_PLANTS_TABLE_NAME = process.env.DYNAMO_MINING_PLANTS_TABLE_NAME;


/**
 * @description function in charge of inserting xml type files into dynamodb
 * @param {Object} event Object type
 * @returns the added object
 */
module.exports.execute = async (event: any) => {
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
        let eventBody = await formatToJson(event.body);

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