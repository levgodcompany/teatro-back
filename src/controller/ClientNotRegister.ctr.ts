import { Request, Response } from "express";
import ClientNotRegisterService from "../services/ClientNotRegister.service";
import { IClientNotRegister } from "../models/interfaces/ILocal.interface";
import { ResponseHandler } from "../utils/responseHandler";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

class ClientNotRegisterController {

    async register(req: Request, res: Response): Promise<void> {
        try {
          const { name, phone, email } = req.body;
          const client = await ClientNotRegisterService.createClient(name, email, phone)
    
          const respH = new ResponseHandler<IClientNotRegister>();
          respH.parseJson(client);
          respH.respoensHandler(res, HttpStatus.OK);
    
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
      }

}

export default new ClientNotRegisterController()