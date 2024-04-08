import { Request, Response } from "express";
import { IShift } from "../models/interfaces/theater";
import { ShiftsService } from "../services/theater/Shifts.service";
import { ResponseHandler } from "../utils/responseHandler";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

export class ShiftController {
  async createShift(req: Request, res: Response) {
    try {
      const body: IShift = req.body;
      const { idRoom } = req.params;
      const idShiftsDay = req.query.idShiftsDay as string;
      const shiftService = new ShiftsService();

      const shift = await shiftService.createShift(idRoom, idShiftsDay, body);
      const respH = new ResponseHandler<IShift>();
      respH.parseJson(shift);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async updateShift(req: Request, res: Response) {
    try {
      const body: IShift = req.body;
      const { idRoom } = req.params;
      const idShiftsDay = req.query.idShiftsDay as string;
      const idShift = req.query.idShiftsDay as string;
      const shiftService = new ShiftsService();

      const shift = await shiftService.updateShift(
        idRoom,
        idShiftsDay,
        idShift,
        body
      );
      const respH = new ResponseHandler<IShift>();
      respH.parseJson(shift);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async deleteShift(req: Request, res: Response) {
    try {
      const { idRoom } = req.params;
      const idShiftsDay = req.query.idShiftsDay as string;
      const idShift = req.query.idShiftsDay as string;
      const shiftService = new ShiftsService();

      const shift = await shiftService.deleteShift(
        idRoom,
        idShiftsDay,
        idShift
      );
      const respH = new ResponseHandler<boolean>();
      respH.parseJson(shift);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async findShiftById(req: Request, res: Response) {
    try {
      const { idRoom } = req.params;
      const idShiftsDay = req.query.idShiftsDay as string;
      const idShift = req.query.idShiftsDay as string;
      const shiftService = new ShiftsService();

      const shift = await shiftService.findShifsById(
        idRoom,
        idShiftsDay,
        idShift
      );
      const respH = new ResponseHandler<IShift>();
      respH.parseJson(shift);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async findAllShift(req: Request, res: Response) {
    try {
      const { idRoom } = req.params;
      const idShiftsDay = req.query.idShiftsDay as string;
      const shiftService = new ShiftsService();

      const shifts = await shiftService.findAllShifs(idRoom, idShiftsDay);
      const respH = new ResponseHandler<IShift[]>();
      respH.parseJson(shifts);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}
