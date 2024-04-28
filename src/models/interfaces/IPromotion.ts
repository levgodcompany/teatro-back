import { Document } from "mongoose";

// Interfaz para representar una promoción o descuento del local
export interface IPromotion extends Document {
  name: string; // Nombre de la promoción
  description: string; // Descripción de la promoción
  validity?: string; // Validez de la promoción (opcional)
}
