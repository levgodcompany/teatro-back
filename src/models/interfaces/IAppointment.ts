import { Document } from "mongoose";
import { IClient } from "./IClient";

// Interfaz para representar los turnos de reserva
export interface IAppointment extends Document {
  date: string; // Fecha del turno en formato ISO (por ejemplo, "2024-04-25")
  startTime: string; // Hora de inicio del turno en formato ISO (por ejemplo, "2024-04-25T16:00:00-03:00")
  endTime: string; // Hora de finalización del turno en formato ISO (por ejemplo, "2024-04-25T17:00:00-03:00")
  repeat: "daily" | "weekly" | "monthly" | null; // Patrón de repetición (diario, semanal, mensual) o null si no se repite
  repeatTimes?: number; // Número de repeticiones
  available: boolean; // Indica si el turno está disponible
  guestsAllowed: boolean; // Indica si se permiten invitados
  guestsLimit: number; // Número máximo de invitados
  reservedBy?: IClient; // ID del cliente que reservó el turno (opcional)
  guests?: string[]; // Lista de invitados que asistirán al turno
  status: "disponible" | "reservado" | "cancelado"; // Estado del turno: disponible, reservado o cancelado
}
