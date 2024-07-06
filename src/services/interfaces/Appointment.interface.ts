import { IClient, IClientNotRegister } from "../../models/interfaces/ILocal.interface";

export interface IAppointmentNotModel {
    date: Date; // Fecha y hora del turno
    start: Date; // Hora de entrada
    end: Date; // Hora de salida
    title: string; // Título del turno
    price: number;
    description: string; // Descripción del turno
    available: boolean; // Para saber si el turno esta o no disponible
    client: IClient["_id"] | null; // Cliente que reservó el turno
    GuestListClient: IClient["_id"][] // lista de invitados a al turno de clientes registrado en la app
    GuestListNotClient: IClientNotRegister["_id"][]// lista de invitados a al turno de clientes no registrado en la app
  }