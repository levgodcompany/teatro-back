import { IShiftsDay } from "../../models/interfaces/theater";
import { NotFoundError } from "../../utils/errors/errors";
import { TheaterService } from "./Theater.service";

export class ShiftsDayService extends TheaterService {

    
    async createShiftsDay(idRoom: string, shiftsDay: IShiftsDay){
        const theater = await this.getTheater();

        const room = theater.rooms.findIndex(r => r._id == idRoom);

        if(room == -1){
            throw new NotFoundError(`No se encontro el room ${idRoom}`)
        }

        theater.rooms[room].shiftsDay.push(shiftsDay);

        await this.update(theater._id, theater);

        return shiftsDay
    }

    async updateShifsDay(idRoom: string, idShiftsDay: string, shiftsDay: IShiftsDay){
        const theater = await this.getTheater();

        const room = theater.rooms.findIndex(r => r._id == idRoom);

        if(room == -1){
            throw new NotFoundError(`No se encontro el room ${idRoom}`)
        }

        const shiftsDayIndex =  theater.rooms[room].shiftsDay.findIndex(s => s._id == idShiftsDay);

        if(room == -1){
            throw new NotFoundError(`No se encontro el dia ${idShiftsDay}`)
        }

        theater.rooms[room].shiftsDay[shiftsDayIndex] = shiftsDay;

        await this.update(theater._id, theater);

        return shiftsDay
    }


    async deleteShiftsDay(idRoom: string, idShiftsDay: string){
        const theater = await this.getTheater();

        const room = theater.rooms.findIndex(r => r._id == idRoom);

        if(room == -1){
            throw new NotFoundError(`No se encontro el room ${idRoom}`)
        }

        theater.rooms[room].shiftsDay = theater.rooms[room].shiftsDay.filter(s=> s._id != idShiftsDay);

        await this.update(theater._id, theater);

        return true
    }

    async findAllShiftsDay(idRoom: string){
        const theater = await this.getTheater();

        const room = theater.rooms.findIndex(r => r._id == idRoom);

        if(room == -1){
            throw new NotFoundError(`No se encontro el room ${idRoom}`)
        }

        return theater.rooms[room].shiftsDay
    }


    async findShiftsDayById(idRoom: string, idShiftsDay: string){
        const theater = await this.getTheater();

        const room = theater.rooms.findIndex(r => r._id == idRoom);

        if(room == -1){
            throw new NotFoundError(`No se encontro el room ${idRoom}`)
        }

        const shiftsDay = theater.rooms[room].shiftsDay.find(s => s._id == idShiftsDay);

        if(!shiftsDay){
            throw new NotFoundError(`No se encontro el dia ${idShiftsDay}`)
        }

        return shiftsDay
    }
    
}