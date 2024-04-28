import { Document } from "mongoose";

// Interfaz para representar el horario de un día específico
export interface IDaySchedule extends Document {
  day: Day; // Día de la semana
  startTime: string; // Hora de apertura
  endTime: string; // Hora de cierre
}
