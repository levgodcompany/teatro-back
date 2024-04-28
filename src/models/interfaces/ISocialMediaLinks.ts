import { Document } from "mongoose";

// Interfaz para representar enlaces a redes sociales
export interface ISocialMediaLinks extends Document {
  facebook?: string; // Enlace al perfil de Facebook (opcional)
  twitter?: string; // Enlace al perfil de Twitter (opcional)
  instagram?: string; // Enlace al perfil de Instagram (opcional)
  youtube?: string; // Enlace al canal de YouTube (opcional)
  linkedin?: string; // Enlace al perfil de LinkedIn (opcional)
  other?: string; // Otros enlaces a redes sociales (opcional)
}
