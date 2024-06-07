import { AppointmentClientDTO, AppointmentDTO, IShiftsDTO } from "../DTO/Appointment/Appointment.DTO";
import { IAppointment, IClient } from "../models/interfaces/ILocal.interface";
import {
  AppointmentModel,
  ClientModel,
  RoomModel,
} from "../models/schema/ISchema.schema";
import { NotFoundError } from "../utils/errors/errors";
import ClientService from "./Client.service";
import ClientNotRegisterService from "./ClientNotRegister.service";

class AppointmentService {
  async createAppointment(appointmentDTO: Partial<IAppointment>, roomId: string) {
    try {
      const newAppointment = new AppointmentModel(appointmentDTO);
      const roomReuslt = await RoomModel.findByIdAndUpdate(roomId, {
        $push: { availableAppointments: newAppointment },
      });
      if(!roomReuslt) {
        throw new NotFoundError(`Sala no encontrada`)
      }else {

        const room = await RoomModel.findById(roomId);
        if (!room) {
          throw new Error(`No se encontró la sala`);
        }
        return room.availableAppointments;

      }
    } catch (error) {
      throw new Error(`Error al crear turno: ${error}`);
    }
  }

  async createAppointments(appointments: Partial<IAppointment>[], roomId: string) {
    try {
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
            client: null,
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

  async getAllClientAppointments(roomId: string, appointmentId: string) {
    try {
      const room = await RoomModel.findById(roomId);
      if (!room) {
        throw new NotFoundError(`No se encontró la sala`);
      }
      const appointmentIndex = room.availableAppointments.findIndex(app => app._id == appointmentId);

      if(appointmentIndex == -1) {
        throw new NotFoundError(`Turno no encontrado`)
      }

      const clients: AppointmentClientDTO[] = [];
      for(const id of room.availableAppointments[appointmentIndex].GuestListClient) {
        const c = await ClientService.getClientById(id);
        if(c) {
          clients.push({
            id: c._id,
            email: c.email,
            name: c.name,
            phone: c.phone
          })
        }
      }

      for(const id of room.availableAppointments[appointmentIndex].GuestListNotClient) {
        const c = await ClientNotRegisterService.getClientById(id);
        if(c) {
          clients.push({
            id: c._id,
            email: c.email,
            name: c.name,
            phone: c.phone
          })
        }
      }

      return clients

    } catch (error) {
      throw new Error(`Error al obtener turnos: ${error}`);
    }
  }


  async getClientAppointment(roomId: string, appointmentId: string) {
    try {
      const room = await RoomModel.findById(roomId);
      if (!room) {
        throw new NotFoundError(`No se encontró la sala`);
      }
      const appointmentIndex = room.availableAppointments.findIndex(app => app._id == appointmentId);

      if(appointmentIndex == -1) {
        throw new NotFoundError(`Turno no encontrado`)
      }

      const client =  room.availableAppointments[appointmentIndex].client;

      if(client) {
        const c = await ClientService.getClientById(client);
        if(c) {
          const clientDto: AppointmentClientDTO = {
            id: c._id,
            email: c.email,
            name: c.name,
            phone: c.phone
          }
           return clientDto;
        
        }

      }
      throw new NotFoundError(`No existe el cliente organizador`)

    } catch (error) {
      throw new Error(`Error al obtener turnos: ${error}`);
    }
  }

  async deleteAppointment(roomId: string, appointmentId: string): Promise<void> {
    try {
      const room = await RoomModel.findById(roomId);
      if (!room) {
        throw new Error(`No se encontró la sala`);
      }

      const appointment = room.availableAppointments.find(appoint => appoint._id == appointmentId);
      if (!appointment) {
        throw new Error(`No se encontró el turno con ID ${appointmentId}`);
      }

      await RoomModel.findByIdAndUpdate(roomId, {
        $pull: { availableAppointments: { _id: appointmentId } },
      });

      if (appointment.client) {
        await ClientModel.findByIdAndUpdate(appointment.client, {
          $pull: { bookedAppointments: appointmentId },
        });
      }

    } catch (error) {
      throw new Error(`Error al eliminar turno: ${error}`);
    }
  }

  async updateAppointment(roomId: string, appointmentId: string, updatedData: Partial<IAppointment>): Promise<IAppointment | null> {
    try {
      const room = await RoomModel.findOneAndUpdate(
        { _id: roomId, "availableAppointments._id": appointmentId },
        {
          $set: {
            "availableAppointments.$": updatedData,
          },
        },
        { new: true }
      );

      if (!room) {
        throw new Error(`No se encontró la sala o el turno con ID ${appointmentId}`);
      }

      const updatedAppointment = room.availableAppointments.find(appoint => appoint._id == appointmentId);
      if (!updatedAppointment) {
        throw new Error(`No se encontró el turno actualizado con ID ${appointmentId}`);
      }

      return updatedAppointment;
    } catch (error) {
      throw new Error(`Error al actualizar turno: ${error}`);
    }
  }
}

export default new AppointmentService();
