import { Document } from "mongoose";

// Interfaz para representar servicios y amenidades adicionales ofrecidos por el local
export interface IAmenity extends Document {
  name: string; // Nombre del servicio o amenidad
  description: string; // Descripción del servicio o amenidad
}
