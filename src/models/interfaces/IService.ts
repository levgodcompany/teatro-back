import { Document } from "mongoose";

// Interfaz para representar un servicio ofrecido por el local
export interface IService extends Document {
  name: string; // Nombre del servicio
  description: string; // Descripción del servicio
  basePrice: number; // Precio base del servicio (debería ser un número positivo)
  duration: number; // Duración del servicio en minutos (debería ser un número positivo)
  isActive: boolean; // Indica si el servicio está activo o no
  isVIP: boolean; // Indica si el servicio es VIP
  image?: string; // URL de la imagen del servicio (opcional)
  availability?: string; // Disponibilidad del servicio (opcional) - Se podría considerar una validación de formato
  capacity?: number; // Capacidad máxima del servicio (opcional) - Debería ser un número positivo
  features?: Record<string, any>; // Características adicionales del servicio (opcional)
  rating?: number; // Clasificación del servicio (opcional) - Se podría considerar un rango de valores
}

export interface IIncludedService {
  name: string; // Nombre del servicio incluido
  description: string; // Descripción del servicio incluido
}

export interface IExtraService {
  name: string; // Nombre del servicio extra
  description: string; // Descripción del servicio extra
  extraPrice: number; // Precio adicional del servicio extra (debería ser un número positivo)
}

export interface IServicesOffered extends IService {
  includedServices: IIncludedService[]; // Lista de servicios incluidos en el servicio reservable
  extraServices: IExtraService[]; // Lista de servicios extra disponibles para el servicio reservable
}

