import { IClientAppointmetDay, IClientSpecificDayAppointment } from "../DTO/Clients/Clients.DTO";
import { IAppointment, IClient } from "../models/interfaces/ILocal.interface";
import {
  AppointmentModel,
  ClientModel,
  RoomModel,
} from "../models/schema/ISchema.schema";
import { Bcrypt } from "../utils/bccrypt.handle";
import { NotFoundError } from "../utils/errors/errors";
import AppointmentService from "./Appointment.service";
import { IAppointmentNotModel } from "./interfaces/Appointment.interface";
import RoomService from "./Room.service";

class ClientService {
  // Método para crear un nuevo cliente
  async createClient(
    name: string,
    email: string,
    phone: string,
    password: string,
    token: string
  ) {
    try {
      const newClient = await ClientModel.create({
        name,
        email,
        phone,
        password,
        token,
      });
      return newClient;
    } catch (error) {
      throw new Error(`Error al crear cliente: ${error}`);
    }
  }

  // Método para obtener todos los clientes
  async getAllClients() {
    try {
      const clients = await ClientModel.find();
      return clients;
    } catch (error) {
      throw new Error(`Error al obtener clientes: ${error}`);
    }
  }

  // Método para obtener un cliente por su ID
  async getClientById(clientId: string) {
    try {
      const client = await ClientModel.findById(clientId);
      return client;
    } catch (error) {
      throw new Error(`Error al obtener cliente: ${error}`);
    }
  }

  // Método para obtener un cliente por su ID
  async getClientByEmail(email: string) {
    try {
      const client = await ClientModel.findOne({ email: email });
      return client;
    } catch (error) {
      throw new Error(`Error al obtener cliente: ${error}`);
    }
  }

  // Método para actualizar un cliente existente
  async updateClient(clientId: string, updatedData: Partial<IClient>) {
    try {

      if(updatedData.password) {
        const bccy = new Bcrypt();
        const passEncript = await bccy.encrypt(updatedData.password);
        updatedData.password = passEncript;

        const client = await ClientModel.findByIdAndUpdate(
          clientId,
          updatedData,
          { new: true }
        );
        return client;
      }else {

        const client = await ClientModel.findByIdAndUpdate(
          clientId,
          updatedData,
          { new: true }
        );
        return client;
      }

    } catch (error) {
      throw new Error(`Error al actualizar cliente: ${error}`);
    }
  }

  // Método para eliminar un cliente
  async deleteClient(clientId: string): Promise<void> {
    try {
      await ClientModel.findByIdAndDelete(clientId);
    } catch (error) {
      throw new Error(`Error al eliminar cliente: ${error}`);
    }
  }

  // Método para que un cliente reserve un turno
  async bookAppointment(
    clientId: string,
    roomId: string,
    appointmentId: string
  ) {
    try {
      // Verificar si el turno está disponible
      const room = await RoomModel.findById(roomId);
      if (!room) {
        throw new Error("Sala no encontrada");
      }
      const appointmentIndex = room.availableAppointments.findIndex(
        (appointment) => appointment._id == appointmentId
      );

      if (appointmentIndex === -1) {
        throw new Error("Turno no encontrado");
      }

      const appointment = room.availableAppointments[appointmentIndex];

      // Verificar si el turno ya está reservado por otro cliente
      if (!appointment.available) {
        throw new Error("El turno no está disponible");
      }

      // Verificar si el turno ya está reservado por otro cliente
      if (appointment.client) {
        throw new Error("El turno ya está reservado");
      }

      // Reservar el turno para el cliente
      const client = await ClientModel.findByIdAndUpdate(
        clientId,
        { $push: { bookedAppointments: appointmentId } },
        { new: true }
      );

      if (!client) {
        throw new Error("Cliente no encontrado");
      }

      // Actualizar el cliente y disponibilidad en el turno
      room.availableAppointments[appointmentIndex].client = client._id;
      room.availableAppointments[appointmentIndex].available = false;

      // Guardar los cambios en el documento de la sala
      await room.save();

      return client;
    } catch (error) {
      throw new Error(`Error al reservar turno: ${error}`);
    }
  }

  // Método para que un cliente cancele un turno
  async cancelAppointment(clientId: string, appointmentId: string) {
    try {
      // Verificar si el cliente tiene el turno reservado
      const client = await ClientModel.findById(clientId);
      if (!client) {
        throw new Error("Cliente no encontrado");
      }

      const index = client.bookedAppointments.findIndex(
        (book) => book._id == appointmentId
      );
      if (index === -1) {
        throw new Error("El cliente no tiene este turno reservado");
      }

      // Eliminar el turno reservado del cliente
      client.bookedAppointments.splice(index, 1);
      await client.save();

      // Eliminar la referencia al cliente del turno
      await AppointmentModel.findByIdAndUpdate(appointmentId, { client: null });

      return client;
    } catch (error) {
      throw new Error(`Error al cancelar turno: ${error}`);
    }
  }

  generateDailyReservations(config: IClientAppointmetDay): IAppointmentNotModel[] {
    const {
      clientId,
      daysOfWeek,
      startTime,
      endTime,
      repetitionsPerMonth,
      months,
      title,
      description,
      price,
      GuestListClient,
      GuestListNotClient
    } = config; // Desestructuramos la configuración de reservas
  
    const today = new Date(); // Fecha actual
    const appointments: IAppointmentNotModel[] = []; // Arreglo para almacenar las reservas
  
    // Función para convertir una hora en formato HH:MM a un objeto Date
    function parseTime(time: string): Date {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }
  
    const start = parseTime(startTime);
    const end = parseTime(endTime);
  
    let nexYear = false;
    let currentYear = today.getFullYear(); // Año actual
    let newMont = 0;
    // Iterar sobre el número de meses especificado
    for (let i = 0; i < months; i++) {
      let currentMonth = today.getMonth() + i; // Mes actual ajustado por el índice i
      
      if(nexYear == true){
        currentYear = today.getFullYear() + 1; // Año actual
      }

      if(currentMonth == 12){
        nexYear = true
      }

      if(currentMonth > 12){
        ++newMont;
        currentMonth = newMont;
      }

  
      // Iterar sobre el número de repeticiones por mes
      for (let j = 0; j < repetitionsPerMonth; j++) {
        // Iterar sobre los días de la semana especificados
        for (let k = 0; k < daysOfWeek.length; k++) {
          const targetDayOfWeek = daysOfWeek[k]; // Día de la semana objetivo
  
          // Encontrar el primer día del mes que sea el día de la semana objetivo
          let day = new Date(currentYear, currentMonth, 1);
          while (day.getDay() !== targetDayOfWeek) {
            day.setDate(day.getDate() + 1);
          }
  
          // Avanzar al día objetivo basado en la repetición actual
          day.setDate(day.getDate() + (j * 7));
  
          // Verificar si la fecha calculada está dentro del mes actual
          if (day.getMonth() === currentMonth) {
            const reservationStart = new Date(day);
            reservationStart.setHours(start.getHours(), start.getMinutes(), 0, 0); // Establecer la hora de inicio
  
            const reservationEnd = new Date(day);
            reservationEnd.setHours(end.getHours(), end.getMinutes(), 0, 0); // Establecer la hora de fin
  
            // Agregar la reserva al arreglo de reservas
            appointments.push({
              date: day,
              start: reservationStart,
              end: reservationEnd,
              title,
              price,
              description,
              available: true, // Asumimos que las nuevas reservas están disponibles
              client: clientId,
              GuestListClient,
              GuestListNotClient,
            });
          }
        }
      }
    }
  
    return appointments;
  }
  

  generateSpecificDayReservations(config: IClientSpecificDayAppointment): IAppointmentNotModel[] {
    const {
      clientId,
      daysOfMonth,
      startTime,
      endTime,
      months,
      title,
      description,
      price,
      GuestListClient,
      GuestListNotClient
    } = config; // Desestructuramos la configuración de reservas
  
    const today = new Date(); // Fecha actual
    const appointments: IAppointmentNotModel[] = []; // Arreglo para almacenar las reservas
  
    // Función para convertir una hora en formato HH:MM a un objeto Date
    function parseTime(time: string): Date {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }
  
    const start = parseTime(startTime);
    const end = parseTime(endTime);
  
    let nexYear = false;
    let currentYear = today.getFullYear(); // Año actual
    let newMont = 0;
    // Iterar sobre el número de meses especificado
    for (let i = 0; i < months; i++) {
      let currentMonth = today.getMonth() + i; // Mes actual ajustado por el índice i
      
      if(nexYear == true){
        currentYear = today.getFullYear() + 1; // Año actual
      }

      if(currentMonth == 12){
        nexYear = true
      }

      if(currentMonth > 12){
        ++newMont;
        currentMonth = newMont;
      }

  
      // Iterar sobre los días específicos del mes
      for (let day of daysOfMonth) {
        const reservationDate = new Date(currentYear, currentMonth, day);
  
        // Verificar si el día es válido en el mes actual (por ejemplo, no todos los meses tienen un día 31)
        if (reservationDate.getMonth() === currentMonth) {
          const reservationStart = new Date(reservationDate);
          reservationStart.setHours(start.getHours(), start.getMinutes(), 0, 0); // Establecer la hora de inicio
  
          const reservationEnd = new Date(reservationDate);
          reservationEnd.setHours(end.getHours(), end.getMinutes(), 0, 0); // Establecer la hora de fin
  
          // Agregar la reserva al arreglo de reservas
          appointments.push({
            date: reservationDate,
            start: reservationStart,
            end: reservationEnd,
            title,
            price,
            description,
            available: true, // Asumimos que las nuevas reservas están disponibles
            client: clientId,
            GuestListClient,
            GuestListNotClient,
          });
        }
      }
    }
  
    return appointments;
  }

  async createAppointmentReservationsDays(idRoom: string, config: IClientAppointmetDay) {
    try {
      const room = await RoomService.getRoomById(idRoom);
      if (!room) {
        throw new NotFoundError(`Sala no encontrado`);
      }
      const client = ClientModel.findById(config.clientId);
      if (!client) {
        throw new NotFoundError(`Cliente no encontrado`);
      }

      const price = room.priceBase;
      config.price = price;

      const appointments =  this.generateDailyReservations(config);
      await AppointmentService.createAppointments(appointments, idRoom);


    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async createAppointmentsByIDRoomAndByIDClient(idRoom: string, clientId: string, appointments: IAppointment[]) {
    const room = await RoomService.getRoomById(idRoom);
    if (!room) {
      throw new NotFoundError(`Sala no encontrado`);
    }
    const client = ClientModel.findById(clientId);
    if (!client) {
      throw new NotFoundError(`Cliente no encontrado`);
    }

    await AppointmentService.addAllAppointments(appointments, idRoom);
  }

  async createAppointmentDayReservations(idRoom: string, config: IClientSpecificDayAppointment) {
    try {
      const room = await RoomService.getRoomById(idRoom);
      if (!room) {
        throw new NotFoundError(`Sala no encontrado`);
      }
      const client = ClientModel.findById(config.clientId);
      if (!client) {
        throw new NotFoundError(`Cliente no encontrado`);
      }

      const price = room.priceBase;
      config.price = price;

      const appointments =  this.generateSpecificDayReservations(config);
      await AppointmentService.createAppointments(appointments, idRoom);


    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}

export default new ClientService();
