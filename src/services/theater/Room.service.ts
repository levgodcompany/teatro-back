import { IRoom } from "../../models/interfaces/theater";
import { NotFoundError } from "../../utils/errors/errors";
import { TheaterService } from "./Theater.service";

export class RoomService extends TheaterService {
  private async updateTheaterRooms(rooms: IRoom[]) {
    const theater = await super.getTheater();
    theater.rooms = rooms;
    return super.updateTheater(theater);
  }

  async createRoom(room: IRoom) {
    const theater = await super.getTheater();
    theater.rooms.push(room);
    const updateRes = await this.updateTheaterRooms(theater.rooms);

    if (updateRes) {
      return room;
    }

    throw new Error(`Error al crear la sala`);
  }

  async updateRoom(idRoom: string, room: IRoom) {
    const theater = await super.getTheater();
    const roomIndex = theater.rooms.findIndex((r) => r._id == idRoom);

    if (roomIndex === -1) {
      throw new Error(`No se encontró la sala con el ID ${idRoom}`);
    }

    theater.rooms[roomIndex] = room;
    const updateRes = await this.updateTheaterRooms(theater.rooms);

    if (updateRes) {
      return room;
    }

    throw new Error(`Error al actualizar la sala`);
  }

  async deleteRoomById(idRoom: string) {
    const theater = await super.getTheater();
    theater.rooms = theater.rooms.filter((room) => room._id !== idRoom);
    const updateRes = await this.updateTheaterRooms(theater.rooms);

    if (updateRes) {
      return true;
    }

    throw new Error(`Error al eliminar la sala`);
  }

  async findAllRooms() {
    const theater = await super.getTheater();
    return theater.rooms;
  }

  async findRoomById(idRoom: string) {
    const theater = await super.getTheater();
    const room = theater.rooms.find((room) => room._id == idRoom);

    if (!room) {
      throw new NotFoundError(`No se encontró la sala`);
    }

    return room;
  }
}
