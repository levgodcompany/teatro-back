import { Document } from "mongoose";

// Interfaz para representar el horario de un evento o actividad
export interface ISchedule extends Document {
  startTime: string; // Hora de inicio del evento
  endTime: string; // Hora de finalización del evento
}
