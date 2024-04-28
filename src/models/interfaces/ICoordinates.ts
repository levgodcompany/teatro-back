import { Document } from "mongoose";

// Interfaz para representar las coordenadas geográficas
export interface ICoordinates extends Document {
  latitude: number; // Latitud
  longitude: number; // Longitud
}