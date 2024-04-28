import { Document } from "mongoose";

// Interfaz para representar atracciones cercanas al local
export interface INearbyAttraction extends Document {
  name: string; // Nombre de la atracción
  description: string; // Descripción de la atracción
  distance: string; // Distancia desde el local
}