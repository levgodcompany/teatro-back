import { Document } from "mongoose";

// Interfaz para representar información legal y de registro
export interface ILegalInfo extends Document {
  businessRegistrationNumber: string; // Número de registro empresarial
  licenses: string[]; // Licencias necesarias
  healthCertificates: string[]; // Certificados de salud
  otherLegalInfo?: string[]; // Otra información legal (opcional)
}
