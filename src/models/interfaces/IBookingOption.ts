import { Document } from "mongoose";
import { IAvailability } from "./IAvailability";

// Interfaz para representar opciones de reserva
export interface IBookingOption extends Document {
    id: string; // Identificador único de la opción de reserva
    name: string; // Nombre de la opción de reserva
    description: string; // Descripción de la opción de reserva
    price: number; // Precio de la opción de reserva
    duration?: string; // Duración de la reserva (opcional)
    availability?: IAvailability; // Disponibilidad de la opción de reserva (opcional)
  }