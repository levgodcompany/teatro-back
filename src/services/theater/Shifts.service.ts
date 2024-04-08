import { IShift, ITheater } from "../../models/interfaces/theater";
import { NotFoundError } from "../../utils/errors/errors";
import { TheaterService } from "./Theater.service";

export class ShiftsService extends TheaterService {
  private findIndexById<T extends { _id?: string }>(
    id: string,
    array: T[],
    errorMessage: string
  ): number {
    const index = array.findIndex((item) => item._id === id);

    if (index === -1) {
      throw new NotFoundError(errorMessage);
    }

    return index;
  }

  private async findRoomAndShiftsDayIndexes(
    idRoom: string,
    idShiftsDay: string,
    theater: ITheater
  ): Promise<{ roomIndex: number; shiftsDayIndex: number }> {
    const roomIndex = this.findIndexById(
      idRoom,
      theater.rooms,
      `No se encontró la sala ${idRoom}`
    );

    const shiftsDayIndex = this.findIndexById(
      idShiftsDay,
      theater.rooms[roomIndex].shiftsDay,
      `No se encontró el día ${idShiftsDay}`
    );

    return { roomIndex, shiftsDayIndex };
  }

  async createShift(
    idRoom: string,
    idShiftsDay: string,
    shifts: IShift
  ): Promise<IShift> {
    const theater = await this.getTheater();
    const { roomIndex, shiftsDayIndex } =
      await this.findRoomAndShiftsDayIndexes(idRoom, idShiftsDay, theater);

    theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts.push(shifts);
    await this.update(theater._id, theater);

    return shifts;
  }

  async updateShift(
    idRoom: string,
    idShiftsDay: string,
    idShift: string,
    shifts: IShift
  ): Promise<IShift> {
    const theater = await this.getTheater();
    const { roomIndex, shiftsDayIndex } =
      await this.findRoomAndShiftsDayIndexes(idRoom, idShiftsDay, theater);

    const shiftIndex = this.findIndexById(
      idShift,
      theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts,
      `No se encontró el turno ${idShift}`
    );

    theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts[shiftIndex] =
      shifts;
    await this.update(theater._id, theater);

    return shifts;
  }

  async deleteShift(
    idRoom: string,
    idShiftsDay: string,
    idShift: string
  ): Promise<boolean> {
    const theater = await this.getTheater();
    const { roomIndex, shiftsDayIndex } =
      await this.findRoomAndShiftsDayIndexes(idRoom, idShiftsDay, theater);

    theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts = theater.rooms[
      roomIndex
    ].shiftsDay[shiftsDayIndex].shifts.filter((s) => s._id !== idShift);
    await this.update(theater._id, theater);

    return true;
  }

  async findAllShifs(idRoom: string, idShiftsDay: string): Promise<IShift[]> {
    const theater = await this.getTheater();
    const { roomIndex, shiftsDayIndex } =
      await this.findRoomAndShiftsDayIndexes(idRoom, idShiftsDay, theater);

    return theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts;
  }

  async findShifsById(
    idRoom: string,
    idShiftsDay: string,
    idShift: string
  ): Promise<IShift> {
    const theater = await this.getTheater();
    const { roomIndex, shiftsDayIndex } =
      await this.findRoomAndShiftsDayIndexes(idRoom, idShiftsDay, theater);

    const shift = theater.rooms[roomIndex].shiftsDay[
      shiftsDayIndex
    ].shifts.find((s) => s._id === idShift);
    if (!shift) {
      throw new NotFoundError(`No se encontró el turno ${idShift}`);
    }

    return shift;
  }
}
