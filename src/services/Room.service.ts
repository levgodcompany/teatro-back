import { RoomDTO, RoomIdName } from "../DTO/Room/Room.DTO";
import { AppointmentModel, LocalModel, RoomModel } from "../models/schema/ISchema.schema"
import { NotFoundError } from "../utils/errors/errors";
import LocalService from "./Local.service";

class RoomService {
  // Método para crear una nueva sala
  async createRoom(roomDTO: RoomDTO) {
    try {
      const newRoom = await RoomModel.create({
        name: roomDTO.name,
        capacity: roomDTO.capacity,
        phone: roomDTO.phone, // Número de teléfono del local
        openingHours: roomDTO.openingHours, // Horario de apertura
        mainImage: roomDTO.mainImage, // Imagen principal del local
        additionalImages: roomDTO.additionalImages, // Lista de imágenes adicionales del local
        description: roomDTO.description, // Descripción del local
        services: roomDTO.services, // Lista de servicios que ofrece el local
        availableAppointments: []
      });


      const localId = await LocalService.getLocalID()
      await LocalModel.findByIdAndUpdate(
        localId,
        { $push: { rooms: newRoom._id } }
    );


      return newRoom;
    } catch (error) {
      throw new Error(`Error al crear sala: ${error}`);
    }
  }

  // Método para obtener todas las salas
  async getAllRooms() {
    try {
      const rooms = await RoomModel.find().populate('availableAppointments').exec();
      return rooms;
    } catch (error) {
      throw new Error(`Error al obtener salas: ${error}`);
    }
  }

    // Método para obtener todas las salas
    async getAllIdRooms() {
      try {
        const rooms = await RoomModel.find().populate('availableAppointments').exec();
        const ids: RoomIdName[] = rooms.map(room => {
          const r: RoomIdName = {
            id: room._id,
            name: room.name
          }

          return r;
        });
        return ids;
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
      const room = await RoomModel.findById(roomId).populate('availableAppointments').exec();
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
