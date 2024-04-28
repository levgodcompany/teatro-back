import { Document } from "mongoose";

// Interfaz para representar una política o normativa del local
export interface IPolicy extends Document {
  name: string; // Nombre de la política
  description: string; // Descripción de la política
}
