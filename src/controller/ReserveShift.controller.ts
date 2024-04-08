import { Request, Response } from "express";
import { ReserveShiftDto } from "../dto/request/reserveShift.dto";
import { ReserveShiftService } from "../services/theater/ReserveShift.service";
import { ResponseHandler } from "../utils/responseHandler";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

export class ReserveShiftController {
    async reserveShift(req: Request, res: Response) {
        try {
          const body: ReserveShiftDto = req.body;
          const reservedShiftService = new ReserveShiftService();
          const client = await reservedShiftService.reserveShift(body)
          const respH = new ResponseHandler<boolean>();
          respH.parseJson(client);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
      }

      async cancelableUntilReserveShify(req: Request, res: Response) {
        try {
          const body: ReserveShiftDto = req.body;
          const reservedShiftService = new ReserveShiftService();
          const client = await reservedShiftService.CancelableUntilReserveShify(body)
          const respH = new ResponseHandler<boolean>();
          respH.parseJson(client);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
      }

      async confirmedShift(req: Request, res: Response) {
        try {
          const body: ReserveShiftDto = req.body;
          const reservedShiftService = new ReserveShiftService();
          const client = await reservedShiftService.confirmedShift(body)
          const respH = new ResponseHandler<boolean>();
          respH.parseJson(client);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
      }
}