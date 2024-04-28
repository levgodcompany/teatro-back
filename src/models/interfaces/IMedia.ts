import { Document } from "mongoose";

// Interfaz para representar medios de fotos y videos
export interface IMedia extends Document {
  type: "photo" | "video"; // Tipo de medio (foto o video)
  url: string; // URL del medio
  description?: string; // Descripción del medio (opcional)
}