import { Request, Response } from "express";
import { Auth, RegisterClientAuthDto } from "../dto/auth";
import { AuthService } from "../services/theater/Auth.service";
import { ResponseHandler } from "../utils/responseHandler";
import { IClient } from "../models/interfaces/theater";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

export class AuthController {
  async loginClient(req: Request, res: Response) {
    try {
      const body: Auth = req.body;
      const authService = new AuthService();

      const client = await authService.loginClient(body);
      const respH = new ResponseHandler<IClient>();
      respH.parseJson(client);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async registerClient(req: Request, res: Response) {
    try {
      const body: RegisterClientAuthDto = req.body;
      const authService = new AuthService();

      const client = await authService.registerClient(body);
      const respH = new ResponseHandler<IClient>();
      respH.parseJson(client);
      respH.respoensHandler(res, HttpStatus.Created);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}
