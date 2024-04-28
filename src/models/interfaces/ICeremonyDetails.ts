import { Document } from "mongoose";

// Interfaz para representar detalles de una ceremonia de apertura
export interface ICeremonyDetails extends Document {
  date: Date; // Fecha de la ceremonia
  time: string; // Hora de la ceremonia
  description?: string; // Descripción adicional de la ceremonia (opcional)
}
