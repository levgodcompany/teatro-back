import { Request, Response } from "express";
import { ResponseHandler } from "../utils/responseHandler";
import { ValidErrors } from "../utils/errors/error.handle";
import { HttpStatus } from "../utils/HttpStatus";
import AuthService from "../services/Auth.service";
import { IClient, IOwner } from "../models/interfaces/ILocal.interface";

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const client = await AuthService.login(email, password);

      const respH = new ResponseHandler<IClient>();
      respH.parseJson(client);
      respH.respoensHandler(res, HttpStatus.OK);

    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, phone, email, password } = req.body;
      const client = await AuthService.registerNewUser(name, email, phone, password)

      const respH = new ResponseHandler<IClient>();
      respH.parseJson(client);
      respH.respoensHandler(res, HttpStatus.OK);

    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async loginOwner(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const owner = await AuthService.loginOwner(email, password);

      const respH = new ResponseHandler<IOwner>();
      respH.parseJson(owner);
      respH.respoensHandler(res, HttpStatus.OK);

    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async registerOwner(req: Request, res: Response): Promise<void> {
    try {
      const { name, phone, email, password } = req.body;
      const owner = await AuthService.registerNewOwer(name, email, phone, password)

      const respH = new ResponseHandler<IOwner>();
      respH.parseJson(owner);
      respH.respoensHandler(res, HttpStatus.OK);

    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}

export default new AuthController();