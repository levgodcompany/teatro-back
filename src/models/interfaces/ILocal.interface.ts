import { Document } from "mongoose";

export interface ILocal extends Document {
  name: string; // Nombre del local
  address: string; // Dirección del local
  phone: string; // Número de teléfono del local
  email: string; // Correo electrónico del local
  openingHours: IOpeningDays; // Horario de apertura
  mainImage: IImage; // Imagen principal del local
  additionalImages: IImage[]; // Lista de imágenes adicionales del local
  description: string; // Descripción del local
  services: string[]; // Lista de servicios que ofrece el local
  rooms: IRoom["_id"][];
}

export interface IOpeningDays {
  monday: IOpeningCloseHours; // Horario de apertura los lunes
  tuesday: IOpeningCloseHours; // Horario de apertura los martes
  wednesday: IOpeningCloseHours; // Horario de apertura los miércoles
  thursday: IOpeningCloseHours; // Horario de apertura los jueves
  friday: IOpeningCloseHours; // Horario de apertura los viernes
  saturday: IOpeningCloseHours; // Horario de apertura los sábados
  sunday: IOpeningCloseHours; // Horario de apertura los domingos
}

export interface IOpeningCloseHours {
  isOpen: boolean;
  open: string;
  close: string;
}

export interface IOwner extends Document {
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  password: string; // Contraseña del cliente
  phone: string; // Número de teléfono del cliente
  token: string; // Token del usuario (Esto se tiene que modificar a toda costa, esto no se hace de esta forma)
}

export interface IDailyReservation {
  startTime: string; // Hora de inicio de la reserva (formato HH:MM)
  endTime: number; // Duración de la reserva en minutos
  recurring: boolean; // Indica si la reserva es recurrente
  daysOfWeek: number[]; // Días de la semana para reservas recurrentes (0: Domingo, 1: Lunes, ..., 6: Sábado)
  specificDates: string[]; // Fechas específicas para reservas no recurrentes (formato YYYY-MM-DD)
}

export interface IClient extends Document {
  name: string; // Nombre del cliente
  email: string; // Correo electrónico del cliente
  password: string; // Contraseña del cliente
  phone: string; // Número de teléfono del cliente
  token: string; // Token del usuario (Esto se tiene que modificar a toda costa, esto no se hace de esta forma)
  bookedAppointments: IAppointment["_id"][]; // Lista de turnos reservados por el cliente
}

export interface IAppointment extends Document {
  date: Date; // Fecha y hora del turno
  start: Date; // Hora de entrada
  end: Date; // Hora de salida
  title: string; // Título del turno
  price: number;
  dto: IDtoAppointment | null;
  description: string; // Descripción del turno
  available: boolean; // Para saber si el turno esta o no disponible
  client: IClient["_id"] | null; // Cliente que reservó el turno
  GuestListClient: IClient["_id"][] // lista de invitados a al turno de clientes registrado en la app
  GuestListNotClient: IClientNotRegister["_id"][]// lista de invitados a al turno de clientes no registrado en la app
}

export interface IDtoAppointment {
  dto: number; // Procentaje de descuento
  newPrice: number; // precio con decuento
  prevPrice: number; // precio sin descuetno
}

export interface IRoom extends Document {
  name: string; // Nombre de la sala
  capacity: number; // Capacidad máxima de personas en la sala
  priceBase: number; // Precio base que sale alquilar la sala
  availableAppointments: IAppointment[]; // Lista de turnos disponibles en la sala
  phone: string; // Número de teléfono del local
  openingHours: IOpeningDays; // Horario de apertura
  mainImage: IImage; // Imagen principal del local
  additionalImages: IImage[]; // Lista de imágenes adicionales del local
  description: string; // Descripción del local
  services: string[]; // Lista de servicios que ofrece el local
  dtoRoomHours: DtoRoom[];
  length: string;
  Width: string;
  typeRoom: string;
}

export interface DtoRoom {
  startHour: string;
  endHour: string;
  dto: number
}

export interface IImage {
  url: string; // URL de la imagen
  description?: string; // Descripción opcional de la imagen
}


export interface IClientNotRegister extends Document{
  name: string;
  email: string;
  phone: string;
  bookedAppointments: IAppointment["_id"][]; // Lista de turnos reservados por el cliente
}