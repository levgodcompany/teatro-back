import { Document } from "mongoose";
import { IRoom, IShiftsDay } from "../../models/interfaces/theater";
import { NotFoundError } from "../../utils/errors/errors";
import { TheaterService } from "./Theater.service";

export class ShiftsDayService extends TheaterService {
  private async findIndexById<T extends { _id?: string }>(
    id: string,
    array: T[],
    errorMessage: string
  ) {
    const index = array.findIndex((item) => item._id === id);

    if (index === -1) {
      throw new NotFoundError(errorMessage);
    }

    return index;
  }

  private async findRoomIndexById(idRoom: string, array: IRoom[]) {
    return await this.findIndexById<IRoom>(
      idRoom,
      array,
      `No se encontró la sala ${idRoom}`
    );
  }

  private async findShiftsDayIndexById(
    idShiftsDay: string,
    array: IShiftsDay[]
  ) {
    return await this.findIndexById<IShiftsDay>(
      idShiftsDay,
      array,
      `No se encontró el día ${idShiftsDay}`
    );
  }

  async createShiftsDay(idRoom: string, shiftsDay: IShiftsDay) {
    const theater = await this.getTheater();
    const roomIndex = await this.findRoomIndexById(idRoom, theater.rooms);

    theater.rooms[roomIndex].shiftsDay.push(shiftsDay);
    await this.update(theater._id, theater);

    return shiftsDay;
  }

  async updateShifsDay(
    idRoom: string,
    idShiftsDay: string,
    shiftsDay: IShiftsDay
  ) {
    const theater = await this.getTheater();
    const roomIndex = await this.findRoomIndexById(idRoom, theater.rooms);
    const shiftsDayIndex = await this.findShiftsDayIndexById(
      idShiftsDay,
      theater.rooms[roomIndex].shiftsDay
    );

    theater.rooms[roomIndex].shiftsDay[shiftsDayIndex] = shiftsDay;
    await this.update(theater._id, theater);

    return shiftsDay;
  }

  async deleteShiftsDay(idRoom: string, idShiftsDay: string) {
    const theater = await this.getTheater();
    const roomIndex = await this.findRoomIndexById(idRoom, theater.rooms);

    theater.rooms[roomIndex].shiftsDay = theater.rooms[
      roomIndex
    ].shiftsDay.filter((s) => s._id !== idShiftsDay);
    await this.update(theater._id, theater);

    return true;
  }

  async findAllShiftsDay(idRoom: string) {
    const theater = await this.getTheater();
    const roomIndex = await this.findRoomIndexById(idRoom, theater.rooms);

    return theater.rooms[roomIndex].shiftsDay;
  }

  async findShiftsDayById(idRoom: string, idShiftsDay: string) {
    const theater = await this.getTheater();
    const roomIndex = await this.findRoomIndexById(idRoom, theater.rooms);
    const shiftsDayIndex = await this.findShiftsDayIndexById(
      idShiftsDay,
      theater.rooms[roomIndex].shiftsDay
    );

    return theater.rooms[roomIndex].shiftsDay[shiftsDayIndex];
  }
}
