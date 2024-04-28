import { Document } from "mongoose";

// Interfaz para representar una instalación o comodidad del local
export interface IFacility extends Document {
  name: string; // Nombre de la instalación
  description: string; // Descripción de la instalación
}