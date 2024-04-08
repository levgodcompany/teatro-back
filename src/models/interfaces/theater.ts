import { Document } from "mongoose";

// Teatro
export interface ITheater extends Document {
  name: string;
  logo: string;
  rooms: IRoom[];
  clients: IClient[];
  admins: Admin[];
}

export interface Admin extends Document {
  name: string;
  lasName: string;
  email: string;
  dni: string;
  age: string;
  reservedRoom: IRoom[];
  token: string;
}

// Client
export interface IClient extends Document {
  name: string;
  lasName: string;
  dni: string;
  age: number;
  email: string;
  cel: string;
  password: string;
  reservedRoom: IRoom[];
  token: string;
}

// Sala
export interface IRoom extends Document {
  name: string;
  description: string;
  capacity: number;
  dimensions: IDimensions;
  imgs: string[];
  value: string;
  shiftsDay: IShiftsDay[];
}

// Dimencion de la sala
export interface IDimensions {
  length: string;
  width: string;
  height: string;
}

export interface IShiftsDay extends Document {
  day: string;
  shifts: IShift[];
}

// Tueno
export interface IShift extends Document {
  date: string; // La fecha de la reserva.
  startTime: string; // La hora de inicio de la reserva.
  endTime: string; // La hora de finalización de la reserva.
  rentedBy: {
    name: string;
    email: string;
    phone: string;
    altPhone: string;
  } | null;
  reservedOn: IClient | null;
  bookedOn: string | null; // La fecha en que se realizó la reserva.
  cancelableUntil: string | null; // fecha limite para cancelar la reserva
  canceled: boolean; // si cancelaron la reserva
  reserved: boolean; // Un booleano que indica si la sala está reservada o no.
  confirmed: boolean; // Un booleano que indica si la reserva está confirmada o no.
}
