import { Document } from "mongoose";

// Interfaz para representar horarios especiales
export interface ISpecialHours extends Document {
  date: string; // Fecha especial
  startTime: string; // Hora de apertura
  endTime: string; // Hora de cierre
  description: string; // Descripción o motivo de la especialidad
}
