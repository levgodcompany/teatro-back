import { Request, Response } from 'express';
import LocalService from '../services/Local.service';
import { ValidErrors } from '../utils/errors/error.handle';
import { ILocalDTO } from '../DTO/Local/localDto';
import { ResponseHandler } from '../utils/responseHandler';
import { ILocal } from '../models/interfaces/ILocal.interface';
import { HttpStatus } from '../utils/HttpStatus';

class LocalController {
  async createLocal(req: Request, res: Response): Promise<void> {
    try {
      const localDto: ILocalDTO = req.body;
      const newLocal = await LocalService.createLocal(localDto);

      const respH = new ResponseHandler<ILocal>();
      respH.parseJson(newLocal);
      respH.respoensHandler(res, HttpStatus.Created);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async updateLocalInfo(req: Request, res: Response): Promise<void> {
    try {
      const { localId } = req.params;
      const localDto: Partial<ILocalDTO> = req.body;
      const updateLocal = await LocalService.updateLocalInformaton(localId, localDto)
      const respH = new ResponseHandler<ILocal | null>();
      respH.parseJson(updateLocal);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllLocals(req: Request, res: Response): Promise<void> {
    try {
      const locals = await LocalService.getAllLocals();
      res.status(200).json(locals);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getLocalID(_req: Request, res: Response): Promise<void> {
    try {
      const idLocal = await LocalService.getLocalID();
      
      const respH = new ResponseHandler<{id: string}>();
      respH.parseJson({id: idLocal});
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getLocalById(req: Request, res: Response): Promise<void> {
    try {
      const { localId } = req.params;
      const local = await LocalService.getLocalById(localId);
      if (!local) {
        res.status(404).json({ message: 'Local no encontrado' });
        return;
      }
      const respH = new ResponseHandler<ILocal>();
      respH.parseJson(local);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async addRoomToLocal(req: Request, res: Response): Promise<void> {
    try {
      const { localId, roomId } = req.params;
      const updatedLocal = await LocalService.addRoomToLocal(localId, roomId);
      if (!updatedLocal) {
        res.status(404).json({ message: 'Local no encontrado' });
        return;
      }
      const respH = new ResponseHandler<ILocal>();
      respH.parseJson(updatedLocal);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}

export default new LocalController();
