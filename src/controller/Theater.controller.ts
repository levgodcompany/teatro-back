import { Request, Response } from "express";
import { ITheater } from "../models/interfaces/theater";
import { TheaterService } from "../services/theater/Theater.service";
import { ResponseHandler } from "../utils/responseHandler";
import { ValidErrors } from "../utils/errors/error.handle";
import { HttpStatus } from "../utils/HttpStatus";

export class TheaterController {
  async createTheater(req: Request, res: Response) {
    try {
      const body: ITheater = req.body;
      console.log("body", body);
      const theaterService = new TheaterService();

      const theater = await theaterService.createTheater(body);
      const respH = new ResponseHandler<ITheater>();
      respH.parseJson(theater);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async findTheater(_req: Request, res: Response) {
    try {
      const theaterService = new TheaterService();

      const theater = await theaterService.getTheater();
      const respH = new ResponseHandler<ITheater>();
      respH.parseJson(theater);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}
