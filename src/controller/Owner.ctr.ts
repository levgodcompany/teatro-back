import { Request, Response } from "express";
import OwnerService from "../services/Owner.service";
import { IOwner } from "../models/interfaces/ILocal.interface";
import { ResponseHandler } from "../utils/responseHandler";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

class OwnerController {
    async getOwnerById(req: Request, res: Response): Promise<void> {
        try {
          const { ownerId } = req.params;
          const owner = await OwnerService.getOwnerById(ownerId);
          if (!owner) {
            res.status(404).json({ message: "Dueño no encontrado" });
            return;
          }

          const respH = new ResponseHandler<IOwner>();
          respH.parseJson(owner);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
      }
}

export default new OwnerController();