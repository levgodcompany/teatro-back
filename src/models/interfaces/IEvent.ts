import { Document } from "mongoose";
import { ISchedule } from "./ISchedule";

// Interfaz para representar un evento o actividad del local
export interface IEvent extends Document {
  name: string; // Nombre del evento
  description: string; // Descripción del evento
  schedule: ISchedule; // Horario del evento
}
