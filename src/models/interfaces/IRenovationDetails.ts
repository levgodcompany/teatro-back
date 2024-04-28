import { Document } from "mongoose";

// Interfaz para representar detalles de renovación del local
export interface IRenovationDetails extends Document {
  startDate: Date; // Fecha de inicio de la renovación
  endDate: Date; // Fecha de finalización de la renovación
  description?: string; // Descripción de la renovación (opcional)
}
