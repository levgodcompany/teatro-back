import { AppointmentDTO, IShiftsDTO } from "../DTO/Appointment/Appointment.DTO";
import { IAppointment } from "../models/interfaces/ILocal.interface";
import {
  ClientModel,
  RoomModel,
} from "../models/schema/ISchema.schema";
import { NotFoundError } from "../utils/errors/errors";

class AppointmentService {
  async createAppointment(appointmentDTO: IAppointment, roomId: string) {
    try {

      // Agregar el turno a la lista de turnos disponibles en la sala
      await RoomModel.findByIdAndUpdate(roomId, {
        $push: { availableAppointments: appointmentDTO },
      });

    } catch (error) {
      throw new Error(`Error al crear turno: ${error}`);
    }
  }

  async createAppointments(appointments: IAppointment[], roomId: string) {
    try {
      // Agregar los turnos a la lista de turnos disponibles en la sala
      await RoomModel.findByIdAndUpdate(roomId, {
        $push: { availableAppointments: { $each: appointments } },
      });
    } catch (error) {
      throw new Error(`Error al crear turnos: ${error}`);
    }
  }

  async createAllAppointments(shiftsDTO: IShiftsDTO) {
    try {
      const combineDateAndTime = (date: Date, time: string): Date => {
        const [hours, minutes] = time.split(":").map(Number);
        const combined = new Date(date);
        combined.setUTCHours(hours, minutes, 0, 0);
        return combined;
      };
      // Generar la lista de IAppointment para todos los días
      const appointments: IAppointment[] = shiftsDTO.days.flatMap((day) =>
        shiftsDTO.openingCloseHoursTurnos.map((turno) => {
          const date = day.date;
          const start = combineDateAndTime(date, turno.startHours);
          const end = combineDateAndTime(date, turno.endHours);

          return {
            date,
            start,
            end,
            title: turno.title,
            description: turno.description,
            available: turno.available,
            client: null, // Inicialmente sin cliente
          } as IAppointment;
        })
      );

      const resultShifts: IAppointment[] = [];

      for (const idRoom of shiftsDTO.roomId) {
        await this.createAppointments(appointments, idRoom);
      }

      return resultShifts;
    } catch (error) {
      throw new Error(`Error al crear todos los turnos: ${error}`);
    }
  }

  async getAllAppointments(roomId: string) {
    try {
      const room = await RoomModel.findById(roomId);
      if (!room) {
        throw new Error(`No se encontró la sala`);
      }
      return room.availableAppointments;
    } catch (error) {
      throw new Error(`Error al obtener turnos: ${error}`);
    }
  }

  async deleteAppointment(roomId: string, appointmentId: string): Promise<void> {
    try {
      // Buscar la sala por ID
      const room = await RoomModel.findById(roomId);
      if (!room) {
        throw new Error(`No se encontró la sala`);
      }
  
      // Buscar el turno específico en la lista de turnos disponibles
      const appointment = room.availableAppointments.find(appoint => appoint._id == appointmentId);
      if (!appointment) {
        throw new Error(`No se encontró el turno con ID ${appointmentId}`);
      }
  
      // Eliminar el turno de la lista de turnos disponibles en la sala
      await RoomModel.findByIdAndUpdate(roomId, {
        $pull: { availableAppointments: { _id: appointmentId } },
      });
  
      // Si el turno está reservado por un cliente, eliminar la referencia al turno en los datos del cliente
      if (appointment.client) {
        await ClientModel.findByIdAndUpdate(appointment.client, {
          $pull: { bookedAppointments: appointmentId },
        });
      }
  
    } catch (error) {
      throw new Error(`Error al eliminar turno: ${error}`);
    }
  }
}

export default new AppointmentService();