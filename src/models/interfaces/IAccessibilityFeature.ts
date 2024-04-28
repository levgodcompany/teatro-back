import { Document } from "mongoose";

// Interfaz para representar características de accesibilidad del local
export interface IAccessibilityFeature extends Document {
  name: string; // Nombre de la característica de accesibilidad
  description: string; // Descripción de la característica de accesibilidad
}