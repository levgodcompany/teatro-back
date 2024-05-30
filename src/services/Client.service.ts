import { IClient } from "../models/interfaces/ILocal.interface";
import {
  AppointmentModel,
  ClientModel,
  RoomModel,
} from "../models/schema/ISchema.schema";
import { NotFoundError } from "../utils/errors/errors";

class ClientService {
  // Método para crear un nuevo cliente
  async createClient(
    name: string,
    email: string,
    phone: string,
    password: string,
    token: string
  ) {
    try {
      const newClient = await ClientModel.create({
        name,
        email,
        phone,
        password,
        token,
      });
      return newClient;
    } catch (error) {
      throw new Error(`Error al crear cliente: ${error}`);
    }
  }

  // Método para obtener todos los clientes
  async getAllClients() {
    try {
      const clients = await ClientModel.find();
      return clients;
    } catch (error) {
      throw new Error(`Error al obtener clientes: ${error}`);
    }
  }

  // Método para obtener un cliente por su ID
  async getClientById(clientId: string) {
    try {
      const client = await ClientModel.findById(clientId);
      return client;
    } catch (error) {
      throw new Error(`Error al obtener cliente: ${error}`);
    }
  }

  // Método para obtener un cliente por su ID
  async getClientByEmail(email: string) {
    try {
      const client = await ClientModel.findOne({ email: email });
      return client;
    } catch (error) {
      throw new Error(`Error al obtener cliente: ${error}`);
    }
  }

  // Método para actualizar un cliente existente
  async updateClient(clientId: string, updatedData: Partial<IClient>) {
    try {
      const client = await ClientModel.findByIdAndUpdate(
        clientId,
        updatedData,
        { new: true }
      );
      return client;
    } catch (error) {
      throw new Error(`Error al actualizar cliente: ${error}`);
    }
  }

  // Método para eliminar un cliente
  async deleteClient(clientId: string): Promise<void> {
    try {
      await ClientModel.findByIdAndDelete(clientId);
    } catch (error) {
      throw new Error(`Error al eliminar cliente: ${error}`);
    }
  }

 // Método para que un cliente reserve un turno
 async bookAppointment(
  clientId: string,
  roomId: string,
  appointmentId: string
) {
  try {
    // Verificar si el turno está disponible
    const room = await RoomModel.findById(roomId);
    if (!room) {
      throw new Error("Sala no encontrada");
    }
    const appointmentIndex = room.availableAppointments.findIndex(
      (appointment) => appointment._id == appointmentId
    );

    if (appointmentIndex === -1) {
      throw new Error("Turno no encontrado");
    }

    const appointment = room.availableAppointments[appointmentIndex];

    // Verificar si el turno ya está reservado por otro cliente
    if (!appointment.available) {
      throw new Error("El turno no está disponible");
    }

    // Verificar si el turno ya está reservado por otro cliente
    if (appointment.client) {
      throw new Error("El turno ya está reservado");
    }

    // Reservar el turno para el cliente
    const client = await ClientModel.findByIdAndUpdate(
      clientId,
      { $push: { bookedAppointments: appointmentId } },
      { new: true }
    );

    if (!client) {
      throw new Error("Cliente no encontrado");
    }

    // Actualizar el cliente y disponibilidad en el turno
    room.availableAppointments[appointmentIndex].client = client._id;
    room.availableAppointments[appointmentIndex].available = false;

    // Guardar los cambios en el documento de la sala
    await room.save();

    return client;
  } catch (error) {
    throw new Error(`Error al reservar turno: ${error}`);
  }
}

  // Método para que un cliente cancele un turno
  async cancelAppointment(clientId: string, appointmentId: string) {
    try {
      // Verificar si el cliente tiene el turno reservado
      const client = await ClientModel.findById(clientId);
      if (!client) {
        throw new Error("Cliente no encontrado");
      }

      const index = client.bookedAppointments.findIndex(
        (book) => book._id == appointmentId
      );
      if (index === -1) {
        throw new Error("El cliente no tiene este turno reservado");
      }

      // Eliminar el turno reservado del cliente
      client.bookedAppointments.splice(index, 1);
      await client.save();

      // Eliminar la referencia al cliente del turno
      await AppointmentModel.findByIdAndUpdate(appointmentId, { client: null });

      return client;
    } catch (error) {
      throw new Error(`Error al cancelar turno: ${error}`);
    }
  }
}

export default new ClientService();
