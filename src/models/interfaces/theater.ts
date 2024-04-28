import { Document } from "mongoose";
import { ILocal } from "./ILocal";
import { IClient } from "./IClient";

// Teatro
export interface ITheater extends Document {
  name: string;
  logo: string;
  rooms: ILocal;
  clients: IClient[];
  admins: IAdmin[];
}
// Administrador
export interface IAdmin extends Document {
  name: string;
  lastName: string;
  email: string;
  dni: string;
  age: number;
  token: string;
}


/*

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

export interface INotClient {
  name: string;
  lastName: string;
  email: string;
  bookedOn: string | null; // Fecha en que se realizó la reserva
  cancelableUntil: string | null; // Fecha límite para cancelar la reserva
  canceled: boolean; // Indica si se canceló la reserva
  reserved: boolean; // Indica si la sala está reservada
  confirmed: boolean; // Indica si la reserva está confirmada
}

export interface IEvent {
  title: string;
  description: string;
  schedule: ISchedule;
  repeat: IRepeat;
  reservedBy: IClient;
  guestList: INotClient[] | IClient[]
}


export interface IRepeat {
  frequency: "monthly" | "weekly" | "none",
  repeat: number;
  day: Day[];
  dayMonthly: number[]
}

// Horario de Reserva
export interface ISchedule extends Document{
  startTime: string; // Hora de inicio de la reserva
  endTime: string; // Hora de finalización de la reserva
}


// Reserva de Sala
export interface IReservedRoom extends Document{
  idClient: string; // El cliente que realiza la reserva
  days: IDay[]; // Los días reservados
}

// Día de Reserva
export interface IDay extends Document{
  day: string; // Día de la reserva DD/MM/YYY
  idRoom: string // Id de la sala que reservo
  schedules: ISchedule[]; // Horarios de reserva para este día
}

// Horario de Reserva
export interface ISchedule extends Document{
  startTime: string; // Hora de inicio de la reserva
  endTime: string; // Hora de finalización de la reserva
}




// Sala
export interface IRoom extends Document {
  name: string;
  description: string;
  capacity: number;
  dimensions: IDimensions;
  images: string[]; // Cambiado de imgs a images
  value: string;
  shiftsDay: IShiftsDay[];
}

// Dimensiones de la Sala
export interface IDimensions {
  length: string;
  width: string;
  height: string;
}

// Turno por Día
export interface IShiftsDay extends Document {
  day: string;
  shifts: IShift[];
}

// Turno
export interface IShift extends Document {
  schedule: ISchedule; // Horario de la reserva
  bookedOn: string | null; // Fecha en que se realizó la reserva
  cancelableUntil: string | null; // Fecha límite para cancelar la reserva
  canceled: boolean; // Indica si se canceló la reserva
  reserved: boolean; // Indica si la sala está reservada
  confirmed: boolean; // Indica si la reserva está confirmada
}
*/