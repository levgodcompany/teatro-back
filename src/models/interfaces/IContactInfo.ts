import { Document } from "mongoose";

// Interfaz para representar la información de contacto
export interface IContactInfo extends Document {
    email?: string; // Correo electrónico del local (opcional)
    phoneNumber?: string; // Número de teléfono del local (opcional)
    faxNumber?: string; // Número de fax del local (opcional)
  }