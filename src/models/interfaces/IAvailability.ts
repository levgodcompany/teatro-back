import { Document } from "mongoose";

// Interfaz para representar la disponibilidad de una opción de reserva
export interface IAvailability extends Document {
    startDate: Date; // Fecha de inicio de disponibilidad
    endDate: Date; // Fecha de fin de disponibilidad
    startTime: string; // Hora de inicio de disponibilidad
    endTime: string; // Hora de fin de disponibilidad
    capacity: number; // Capacidad disponible
    isAvailable: boolean; // Indica si la opción de reserva está disponible
  }