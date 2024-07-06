import { IImage, IOpeningDays } from "../../models/interfaces/ILocal.interface";

export interface ILocalDTO {
  name: string; // Nombre del local
  address: string; // Dirección del local
  phone: string; // Número de teléfono del local
  email: string; // Correo electrónico del local
  openingHours: IOpeningDays; // Horario de apertura
  mainImage: IImage; // Imagen principal del local
  additionalImages: IImage[]; // Lista de imágenes adicionales del local
  description: string; // Descripción del local
  services: string[]; // Lista de servicios que ofrece el local
}
