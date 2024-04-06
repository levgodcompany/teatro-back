import { IRoom } from "../../models/interfaces/theater";
import { NotFoundError } from "../../utils/errors/errors";
import { TheaterService } from "./Theater.service";

export class RoomService extends TheaterService {
  async createRoom(room: IRoom) {
    const theater = await super.getTheater();

    theater.rooms.push(room);

    const updateRes = await super.updateTheater(theater);

    if (updateRes) {
      return room;
    }

    throw new Error(`Error al crear el room`);
  }
  

  async updateRoom(idRoom: string, room: IRoom) {
    const theater = await super.getTheater();
    const roomIndex = theater.rooms.findIndex((r) => r._id == idRoom);

    if (roomIndex === -1) {
      throw new Error(`No se encontró el room con el ID ${idRoom}`);
    }

    theater.rooms[roomIndex] = room;

    const updateRes = await super.updateTheater(theater);

    if (updateRes) {
      return room;
    }

    throw new Error(`Error al actualizar el room`);
  }

  async deleteRoomById(idRoom: string){
    const theater = await super.getTheater();

    theater.rooms = theater.rooms.filter(room=> room._id != idRoom);

    const updateRes = await super.updateTheater(theater);

    if (updateRes) {
      return true;
    }

    throw new Error(`Error al eliminar el room`);

  }

  async findAllRooms() {
    const theater = await super.getTheater();
    return theater.rooms;
  }

  async findRoomById(idRoom: string) {
    const theater = await super.getTheater();
    const room = theater.rooms.find((room) => room._id == idRoom);

    if (!room) {
      throw new NotFoundError(`No se encontro la sala`);
    }

    return room;
  }
}
