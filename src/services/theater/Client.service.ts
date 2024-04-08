import { Auth } from "../../dto/auth";
import { ReserveShiftDto } from "../../dto/request/reserveShift.dto";
import { IClient, IShift } from "../../models/interfaces/theater";
import { Bcrypt } from "../../utils/bccrypt.handle";
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../../utils/errors/errors";
import { sendEmail } from "../email.service";
import { RoomService } from "./Room.service";
import { ShiftsService } from "./Shifts.service";
import { ShiftsDayService } from "./ShiftsDay.service";
import { TheaterService } from "./Theater.service";

export class ClientService extends TheaterService {
  private findIndexById<T extends { _id?: string }>(
    id: string,
    array: T[],
    errorMessage: Error
  ): number {
    const index = array.findIndex((item) => item._id == id);

    if (index === -1) {
      throw errorMessage;
    }

    return index;
  }

  async createClient(client: IClient): Promise<IClient> {
    const theater = await this.getTheater();
    theater.clients.push(client);
    await this.update(theater._id, theater);
    return client;
  }

  async deleteClientById(clientId: string): Promise<void> {
    const theater = await this.getTheater();
    const index = this.findIndexById(
      clientId,
      theater.clients,
      new NotFoundError(`No se encontró el cliente con el ID ${clientId}`)
    );
    theater.clients.splice(index, 1);
    await this.update(theater._id, theater);
  }

  async updateClient(clientId: string, updatedClient: IClient): Promise<void> {
    const theater = await this.getTheater();
    const index = this.findIndexById(
      clientId,
      theater.clients,
      new NotFoundError(`No se encontró el cliente con el ID ${clientId}`)
    );
    theater.clients[index] = updatedClient;
    await this.update(theater._id, theater);
  }

  async findAllClients(): Promise<IClient[]> {
    const theater = await this.getTheater();
    return theater.clients;
  }

  async findClientById(clientId: string): Promise<IClient> {
    const theater = await this.getTheater();

    const client = theater.clients.find((client) => client._id == clientId);

    if (!client) {
      throw new NotFoundError(`No se encontro el cliente ID: ${clientId}`);
    }
    return client;
  }

  async findClientByEmailPass(auth: Auth) {
    const theater = await this.getTheater();
    const client = theater.clients.find(
      (client) => client.email === auth.email
    );

    if (!client) {
      throw new ValidationError(`No se encontro el email`);
    }
    const bccy = new Bcrypt();
    const isCheck = await bccy.verified(auth.password, client.password);
    if (!isCheck) throw new UnauthorizedError(`password incorrecta`);

    return client;
  }

}
