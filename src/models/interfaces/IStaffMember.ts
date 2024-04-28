import { Document } from "mongoose";

// Interfaz para representar un miembro del personal del local
export interface IStaffMember extends Document {
  name: string; // Nombre del miembro del personal
  role: string; // Rol o función en el local
}