import { Document } from "mongoose";

// Interfaz para métodos genéricos del servicio (Principio abierto/cerrado)
export interface IGenericService<T extends Document> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    updateById(id: string, data: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<boolean>;
  }
  