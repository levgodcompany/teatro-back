import { HttpStatus } from "../utils/HttpStatus";


export interface ResponseJSON <T> {
    success: boolean,
    message: string,
    status: HttpStatus,
    data?: T
}