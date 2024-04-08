import { Request, Response } from "express";
import { IClient } from "../models/interfaces/theater";
import { ClientService } from "../services/theater/Client.service";
import { ResponseHandler } from "../utils/responseHandler";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

export class ClientController {
  async updateClient(req: Request, res: Response) {
    try {
      const body: IClient = req.body;
      const { idClient } = req.params;
      const clientService = new ClientService();

      const room = await clientService.updateClient(idClient, body);
      const respH = new ResponseHandler<string>();
      respH.parseJson(`Client update`);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async deleteClient(req: Request, res: Response) {
    try {
      const { idClient } = req.params;
      const clientService = new ClientService();

      await clientService.deleteClientById(idClient);
      const respH = new ResponseHandler<null>();
      respH.parseJson(null);
      respH.respoensHandler(res, HttpStatus.NoContent);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async findAllClient(req: Request, res: Response) {
    try {
      const clientService = new ClientService();

      const clients = await clientService.findAllClients();
      const respH = new ResponseHandler<IClient[]>();
      respH.parseJson(clients);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async findAllRoomById(req: Request, res: Response) {
    try {
      const { idClient } = req.params;
      const clientService = new ClientService();
      const client = await clientService.findClientById(idClient);
      const respH = new ResponseHandler<IClient>();
      respH.parseJson(client);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}
