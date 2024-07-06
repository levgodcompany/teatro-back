import { Request, Response } from 'express';
import RoomService from '../services/Room.service';
import { ValidErrors } from '../utils/errors/error.handle';
import { ResponseHandler } from '../utils/responseHandler';
import { IRoom } from '../models/interfaces/ILocal.interface';
import { HttpStatus } from '../utils/HttpStatus';
import { RoomDTO } from '../DTO/Room/RoomDto';

class RoomController {
  async createRoom(req: Request, res: Response): Promise<void> {
    try {
      const room: RoomDTO = req.body;
      const newRoom = await RoomService.createRoom(room);

      const respH = new ResponseHandler<IRoom>();
      respH.parseJson(newRoom);
      respH.respoensHandler(res, HttpStatus.Created);

    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllRooms(_req: Request, res: Response): Promise<void> {
    try {
      const rooms = await RoomService.getAllRooms();
      const respH = new ResponseHandler<IRoom[]>();
      respH.parseJson(rooms);
      respH.respoensHandler(res, HttpStatus.OK);

    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllIdRooms(_req: Request, res: Response): Promise<void> {
    try {
      const rooms = await RoomService.getAllIdRooms();
      const respH = new ResponseHandler<any[]>();
      respH.parseJson(rooms);
      respH.respoensHandler(res, HttpStatus.OK);

    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getRoomById(req: Request, res: Response): Promise<void> {
    try {
      const { roomId } = req.params;
      const room = await RoomService.getRoomById(roomId);

      const respH = new ResponseHandler<IRoom>();
      respH.parseJson(room);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllAppointmentByIDRoom(req: Request, res: Response): Promise<void> {
    try {
      const { roomId } = req.params;
      const room = await RoomService.getAllAppointmentByIDRoom(roomId);

      const respH = new ResponseHandler<IRoom>();
      respH.parseJson(room);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async updateByIDRoom(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom } = req.params;
      const body: Partial<IRoom> = req.body
      const room = await RoomService.updateRoom(idRoom, body)

      const respH = new ResponseHandler<IRoom | null>();
      respH.parseJson(room);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async updateRoomAppointments(req: Request, res: Response): Promise<void> {
    try {
      const { roomId } = req.params;
      const { appointmentIds } = req.body;
      const updatedRoom = await RoomService.updateRoomAppointments(roomId, appointmentIds);
      
      const respH = new ResponseHandler<IRoom>();
      respH.parseJson(updatedRoom);
      respH.respoensHandler(res, HttpStatus.OK);
      
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async deleteRoom (req: Request, res: Response): Promise<void> {
    try {
      const { roomId } = req.params;
      const updatedRoom = await RoomService.deleteRoom(roomId);
      
      const respH = new ResponseHandler<string>();
      respH.parseJson(`delete ${roomId}`);
      respH.respoensHandler(res, HttpStatus.OK);
      
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
  
}

export default new RoomController();
