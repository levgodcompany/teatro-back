import { Request, Response } from "express";
import { IShiftsDay } from "../models/interfaces/theater";
import { ShiftsDayService } from "../services/theater/ShiftsDay.service";
import { ResponseHandler } from "../utils/responseHandler";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

export class ShiftsDayController {

    async createShiftDay(req: Request, res: Response) {
        try {
          const body: IShiftsDay = req.body;
          const { idRoom } = req.params
          const shiftDayService = new ShiftsDayService();
    
          const shiftsDay = await shiftDayService.createShiftsDay(idRoom, body)
          const respH = new ResponseHandler<IShiftsDay>();
          respH.parseJson(shiftsDay);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

    async updateShiftDay(req: Request, res: Response) {
        try {
          const body: IShiftsDay = req.body;
          const { idRoom } = req.params
          const idShiftsDay = req.query.idShiftsDay as string;
          const shiftDayService = new ShiftsDayService();
    
          const shiftsDay = await shiftDayService.updateShifsDay(idRoom, idShiftsDay, body);
          const respH = new ResponseHandler<IShiftsDay>();
          respH.parseJson(shiftsDay);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

    async deleteShiftDay(req: Request, res: Response) {
        try {
          const { idRoom } = req.params
          const idShiftsDay = req.query.idShiftsDay as string;
          const shiftDayService = new ShiftsDayService();
    
          const shiftsDay = await shiftDayService.deleteShiftsDay(idRoom, idShiftsDay);
          const respH = new ResponseHandler<boolean>();
          respH.parseJson(shiftsDay);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

    async findShiftDayById(req: Request, res: Response) {
        try {
          const { idRoom } = req.params
          const idShiftsDay = req.query.idShiftsDay as string;
          const shiftDayService = new ShiftsDayService();
    
          const shiftsDay = await shiftDayService.findShiftsDayById(idRoom, idShiftsDay);
          const respH = new ResponseHandler<IShiftsDay>();
          respH.parseJson(shiftsDay);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

    async findAllShiftDay(req: Request, res: Response) {
        try {
          const { idRoom } = req.params
          const shiftDayService = new ShiftsDayService();
    
          const shiftsDay = await shiftDayService.findAllShiftsDay(idRoom);
          const respH = new ResponseHandler<IShiftsDay[]>();
          respH.parseJson(shiftsDay);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

}