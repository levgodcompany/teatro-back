import { Document } from "mongoose";

// Interfaz para representar información sobre estacionamiento del local
export interface IParkingInfo extends Document {
  available: boolean; // Indica si hay estacionamiento disponible
  type: string; // Tipo de estacionamiento (por ejemplo, gratuito, de pago, valet, etc.)
  description?: string; // Descripción adicional sobre el estacionamiento (opcional)
}
