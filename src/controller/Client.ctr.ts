import { Request, Response } from "express";
import ClientService from "../services/Client.service";
import { ResponseHandler } from "../utils/responseHandler";
import { IClient } from "../models/interfaces/ILocal.interface";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";
import { ClientDTO } from "../DTO/Clients/Clients.DTO";
import ClientNotRegisterService from "../services/ClientNotRegister.service";

class ClientController {
  async bookAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { clientId, appointmentId, roomId } = req.params;
      const client = await ClientService.bookAppointment(
        clientId,
        roomId,
        appointmentId
      );
      res.status(201).json(client);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { clientId, appointmentId } = req.params;
      const client = await ClientService.cancelAppointment(
        clientId,
        appointmentId
      );

      const respH = new ResponseHandler<IClient>();
      respH.parseJson(client);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllClients(req: Request, res: Response): Promise<void> {
    try {
      const clients = await ClientService.getAllClients();

      const clinetsDto: ClientDTO[] = clients.map((c) => ({
        id: c._id,
        email: c.email,
        name: c.name,
        phone: c.phone,
        isRegister: true
      }));
      const respH = new ResponseHandler<ClientDTO[]>();
      respH.parseJson(clinetsDto);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllClientsAndNotClient(req: Request, res: Response): Promise<void> {
    try {
      const clients = await ClientService.getAllClients();
      const notClients = await ClientNotRegisterService.getAllClients();

      const clinetsDto: ClientDTO[] = clients.map((c) => ({
        id: c._id,
        email: c.email,
        name: c.name,
        phone: c.phone,
        isRegister: true
      }));

      const notClinetsDto: ClientDTO[] = notClients.map((c) => ({
        id: c._id,
        email: c.email,
        name: c.name,
        phone: c.phone,
        isRegister: false
      }));

      const respH = new ResponseHandler<ClientDTO[]>();
      respH.parseJson([...clinetsDto, ...notClinetsDto]);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getClientById(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      const client = await ClientService.getClientById(clientId);
      if (!client) {
        res.status(404).json({ message: "Cliente no encontrado" });
        return;
      }
      res.status(200).json(client);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      const updatedData = req.body;
      const updatedClient = await ClientService.updateClient(
        clientId,
        updatedData
      );
      if (!updatedClient) {
        res.status(404).json({ message: "Cliente no encontrado" });
        return;
      }
      res.status(200).json(updatedClient);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async deleteClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;
      await ClientService.deleteClient(clientId);
      res.status(204).end();
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}

export default new ClientController();
