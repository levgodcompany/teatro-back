import { AppointmentModel, RoomModel } from "../models/schema/ISchema.schema"
import { NotFoundError } from "../utils/errors/errors";

class RoomService {
  // Método para crear una nueva sala
  async createRoom(name: string, capacity: number) {
    try {
      const newRoom = await RoomModel.create({ name, capacity, availableAppointments: [] });
      return newRoom;
    } catch (error) {
      throw new Error(`Error al crear sala: ${error}`);
    }
  }

  // Método para obtener todas las salas
  async getAllRooms() {
    try {
      const rooms = await RoomModel.find();
      console.log(rooms)
      return rooms;
    } catch (error) {
      throw new Error(`Error al obtener salas: ${error}`);
    }
  }

  async getAllAppointmentByIDRoom(roomId: string) {
    try {
      const room = await this.getRoomById(roomId);
      if (!room) {
        throw new NotFoundError(`No se encontro la sala`)
      }

      // Obtener los IDs de availableAppointments
      const appointmentIds = room.availableAppointments;

      // Buscar los documentos de IAppointment usando los IDs obtenidos
      const appointments = await AppointmentModel.find({ _id: { $in: appointmentIds } }).exec();

      room.availableAppointments = appointments

      return room;

    } catch (error) {
      throw new Error(`Error al obtener salas: ${error}`);
    }
  }

  // Método para obtener una sala por su ID
  async getRoomById(roomId: string) {
    try {
      const room = await RoomModel.findById(roomId);
      if (!room) {
        throw new NotFoundError(`Sala no Encontrada`)
      }
      return room;
    } catch (error) {
      throw new Error(`Error al obtener sala: ${error}`);
    }
  }

  // Método para actualizar los turnos disponibles en una sala
  async updateRoomAppointments(roomId: string, appointmentIds: string[]) {
    try {
      const room = await RoomModel.findByIdAndUpdate(
        roomId,
        { availableAppointments: appointmentIds },
        { new: true }
      );

      if (!room) {
        throw new NotFoundError(`Sala no Encontrada`)
      }

      return room;
    } catch (error) {
      throw new Error(`Error al actualizar turnos de la sala: ${error}`);
    }
  }
}

export default new RoomService();
