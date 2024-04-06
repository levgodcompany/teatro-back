import { Request, Response } from "express";
import { IRoom } from "../models/interfaces/theater";
import { RoomService } from "../services/theater/Room.service";
import { ResponseHandler } from "../utils/responseHandler";
import { HttpStatus } from "../utils/HttpStatus";
import { ValidErrors } from "../utils/errors/error.handle";

export class RoomController {

    async createRoom(req: Request, res: Response) {
        try {
          const body: IRoom = req.body;
          const roomService = new RoomService();
    
          const room = await roomService.createRoom(body);
          const respH = new ResponseHandler<IRoom>();
          respH.parseJson(room);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

    async updateRoom(req: Request, res: Response) {
        try {
          const body: IRoom = req.body;
          const { idRoom } = req.params
          const roomService = new RoomService();
    
          const room = await roomService.updateRoom(idRoom, body)
          const respH = new ResponseHandler<IRoom>();
          respH.parseJson(room);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

    async deleteRoom(req: Request, res: Response) {
        try {
          const { idRoom } = req.params
          const roomService = new RoomService();
    
          const room = await roomService.deleteRoomById(idRoom)
          const respH = new ResponseHandler<boolean>();
          respH.parseJson(room);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }


    async findAllRoom(req: Request, res: Response) {
        try {
          const roomService = new RoomService();
    
          const rooms = await roomService.findAllRooms()
          const respH = new ResponseHandler<IRoom[]>();
          respH.parseJson(rooms);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }

    async findAllRoomById(req: Request, res: Response) {
        try {
          const roomService = new RoomService();
          const { idRoom } = req.params
          const room = await roomService.findRoomById(idRoom)
          const respH = new ResponseHandler<IRoom>();
          respH.parseJson(room);
          respH.respoensHandler(res, HttpStatus.OK);
        } catch (error) {
          new ValidErrors(error, res).handle();
        }
    }



}