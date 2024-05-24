import { Request, Response } from 'express';
import AppointmentService from '../services/Appointment.service';
import { ValidErrors } from '../utils/errors/error.handle';

class AppointmentController {
  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { date, start, end, roomId } = req.body;
      const newAppointment = await AppointmentService.createAppointment(date, start, end, roomId);
      res.status(201).json(newAppointment);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const { appointmentId } = req.params;
      await AppointmentService.deleteAppointment(appointmentId);
      res.status(204).end();
    } catch (error) {
      new ValidErrors(error, res).handle();
    }
  }
}

export default new AppointmentController();
