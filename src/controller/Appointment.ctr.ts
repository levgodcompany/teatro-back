import { Request, Response } from 'express';
import AppointmentService from '../services/Appointment.service';
import { ValidErrors } from '../utils/errors/error.handle';
import { AppointmentDTO, IShiftsDTO } from '../DTO/Appointment/Appointment.DTO';
import { IAppointment } from '../models/interfaces/ILocal.interface';

class AppointmentController {
  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom }  = req.params;
      const appointmentDTO:IAppointment = req.body;
      const newAppointment = await AppointmentService.createAppointment(appointmentDTO, idRoom);
      res.status(201).json(newAppointment);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async createAllAppointmet(req: Request, res: Response): Promise<void> {
    try {
      const appointmentDTO:IShiftsDTO = req.body;
      const newAppointment = await AppointmentService.createAllAppointments(appointmentDTO);
      res.status(201).json(newAppointment);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom }  = req.params;
      const appointments = await AppointmentService.getAllAppointments(idRoom);
      res.status(200).json(appointments);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { idRoom, appointmentId } = req.params;
      await AppointmentService.deleteAppointment(idRoom, appointmentId);
      res.status(204).end();
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}

export default new AppointmentController();
