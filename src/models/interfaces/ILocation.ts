import { Document } from "mongoose";
import { ICoordinates } from "./ICoordinates";

// Interfaz para representar la ubicación del local
export interface ILocation extends Document {
  address: string; // Dirección del local
  city: string; // Ciudad
  state: string; // Estado o región
  country: string; // País
  postalCode?: string; // Código postal (opcional)
  coordinates?: ICoordinates; // Coordenadas geográficas (opcional)
}
