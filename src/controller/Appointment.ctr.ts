import { Request, Response } from 'express';
import AppointmentService from '../services/Appointment.service';
import { ValidErrors } from '../utils/errors/error.handle';
import { AppointmentDTO, IShiftsDTO } from '../DTO/Appointment/Appointment.DTO';
import { IAppointment } from '../models/interfaces/ILocal.interface';
import { ResponseHandler } from '../utils/responseHandler';
import { HttpStatus } from '../utils/HttpStatus';

class AppointmentController {
  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom }  = req.params;
      const appointmentDTO:IAppointment = req.body;
      await AppointmentService.createAppointment(appointmentDTO, idRoom);
      const appointments = await AppointmentService.getAllAppointments(idRoom)
      const respH = new ResponseHandler<IAppointment[]>();
      respH.parseJson(appointments);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async createAllAppointmet(req: Request, res: Response): Promise<void> {
    try {
      const appointmentDTO:IShiftsDTO = req.body;
      const newAppointment = await AppointmentService.createAllAppointments(appointmentDTO);
      const respH = new ResponseHandler<IAppointment[]>();
      respH.parseJson(newAppointment);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom }  = req.params;
      const appointments = await AppointmentService.getAllAppointments(idRoom);
      const respH = new ResponseHandler<IAppointment[]>();
      respH.parseJson(appointments);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }


  async getClientAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom, appointmentId }  = req.params;
      const appointments = await AppointmentService.getClientAppointment(idRoom, appointmentId);
      const respH = new ResponseHandler<any>();
      respH.parseJson(appointments);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllClientAppointments(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom, appointmentId }  = req.params;
      const appointments = await AppointmentService.getAllClientAppointments(idRoom, appointmentId);
      const respH = new ResponseHandler<any>();
      respH.parseJson(appointments);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom, appointmentId } = req.params;
      await AppointmentService.deleteAppointment(idRoom, appointmentId);
      const appointments = await AppointmentService.getAllAppointments(idRoom);
      const respH = new ResponseHandler<IAppointment[]>();
      respH.parseJson(appointments);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom, appointmentId } = req.params;
      const body: Partial<IAppointment> =  req.body;
      await AppointmentService.updateAppointment(idRoom, appointmentId, body);
      const appointments = await AppointmentService.getAllAppointments(idRoom);
      const respH = new ResponseHandler<IAppointment[]>();
      respH.parseJson(appointments);
      respH.respoensHandler(res, HttpStatus.OK);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}

export default new AppointmentController();
