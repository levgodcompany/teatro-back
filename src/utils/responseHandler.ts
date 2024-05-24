import { Response } from "express"
import { HttpStatus } from "./HttpStatus"
import { ResponseJSON } from "../DTO/Response.json";


export const respoensHandler = <T>(res: Response, status: HttpStatus, data: T ) => res.status(status).send(data);


export class ResponseHandler <T>{
    private jsonResponse!: ResponseJSON<T>;

    parseJson( data: T, message = ''){
        this.jsonResponse = {
            message,
            status: HttpStatus.InternalServerError,
            success: true,
            data
        }
    }

    parseJsonError(message = ''){
        this.jsonResponse = {
            message,
            status: HttpStatus.InternalServerError,
            success: false,
        }
    }

    respoensHandler(res: Response, status: HttpStatus ){
        this.jsonResponse.status = status;
        res.status(status)
        .send(this.jsonResponse);
    }


}


