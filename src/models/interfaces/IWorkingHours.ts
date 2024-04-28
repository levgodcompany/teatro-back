import { Document } from "mongoose";
import { IDaySchedule } from "./IDaySchedule";
import { ISpecialHours } from "./ISpecialHours";



// Interfaz para representar el horario de trabajo
export interface IWorkingHours extends Document {
  days: IDaySchedule[]; // Horario por día
  specialHours?: ISpecialHours[]; // Horario especial para días festivos u ocasiones especiales (opcional)
}
