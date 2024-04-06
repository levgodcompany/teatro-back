import { IShift } from "../../models/interfaces/theater";
import { NotFoundError } from "../../utils/errors/errors";
import { TheaterService } from "./Theater.service";

export class ShiftsService extends TheaterService {


    async createShift(idRoom: string, idShiftsDay: string, shifts: IShift){
        const theater = await this.getTheater();
        const roomIndex = theater.rooms.findIndex(r=> r._id == idRoom);

        console.log("theater", theater)

        if(roomIndex == -1){
            throw new NotFoundError(`No se encontro la sala ${idRoom}`);
        }

        const shiftsDayIndex = theater.rooms[roomIndex].shiftsDay.findIndex(s=> s._id == idShiftsDay);

        if(shiftsDayIndex == -1){
            throw new NotFoundError(`No se encontro el dia ${idShiftsDay}`);
        }

        theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts.push(shifts);

        await this.update(theater._id, theater);

        return shifts;
    }

    async updateShift(idRoom: string, idShiftsDay: string, idShift: string, shifts: IShift){
        const theater = await this.getTheater();
        const roomIndex = theater.rooms.findIndex(r=> r._id == idRoom);

        if(roomIndex == -1){
            throw new NotFoundError(`No se encontro la sala ${idRoom}`);
        }

        const shiftsDayIndex = theater.rooms[roomIndex].shiftsDay.findIndex(s=> s._id == idShiftsDay);

        if(shiftsDayIndex == -1){
            throw new NotFoundError(`No se encontro el dia ${idShiftsDay}`);
        }

        const shiftsIndex = theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts.findIndex(s=> s._id == idShift);

        if(!shiftsIndex){
            throw new NotFoundError(`No se encontro el turno ${idShift}`);
        }

        theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts[shiftsIndex] = shifts;

        await this.update(theater._id, theater)

        return shifts;
    }

    async deleteShift(idRoom: string, idShiftsDay: string, idShift: string){
        const theater = await this.getTheater();
        const roomIndex = theater.rooms.findIndex(r=> r._id == idRoom);

        if(roomIndex == -1){
            throw new NotFoundError(`No se encontro la sala ${idRoom}`);
        }

        const shiftsDayIndex = theater.rooms[roomIndex].shiftsDay.findIndex(s=> s._id == idShiftsDay);

        if(shiftsDayIndex == -1){
            throw new NotFoundError(`No se encontro el dia ${idShiftsDay}`);
        }

        const shifts = theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts.filter(s=> s._id != idShift);

        theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts = shifts;

        await this.update(theater._id, theater)

        return true;
    }


    async findAllShifs(idRoom: string, idShiftsDay: string){
        const theater = await this.getTheater();
        const roomIndex = theater.rooms.findIndex(r=> r._id == idRoom);

        if(roomIndex == -1){
            throw new NotFoundError(`No se encontro la sala ${idRoom}`);
        }

        const shiftsDayIndex = theater.rooms[roomIndex].shiftsDay.findIndex(s=> s._id == idShiftsDay);

        if(shiftsDayIndex == -1){
            throw new NotFoundError(`No se encontro el dia ${idShiftsDay}`);
        }

        return theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts
    }


    async findShifsById(idRoom: string, idShiftsDay: string, idShift: string){
        const theater = await this.getTheater();
        const roomIndex = theater.rooms.findIndex(r=> r._id == idRoom);

        if(roomIndex == -1){
            throw new NotFoundError(`No se encontro la sala ${idRoom}`);
        }

        const shiftsDayIndex = theater.rooms[roomIndex].shiftsDay.findIndex(s=> s._id == idShiftsDay);

        if(shiftsDayIndex == -1){
            throw new NotFoundError(`No se encontro el dia ${idShiftsDay}`);
        }

        const shift = theater.rooms[roomIndex].shiftsDay[shiftsDayIndex].shifts.find(s=> s._id == idShift);

        if(!shift){
            throw new NotFoundError(`No se encontro el turno ${idShift}`);
        }

        return shift
    }



}