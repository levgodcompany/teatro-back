export interface ClientDTO {
    id: string;
    name: string;
    email: string;
    phone: string;
    isRegister: boolean;
}

export interface IClientAppointmetDay {
    clientId: string, // ID del cliente
    daysOfWeek: number[], // Días de la semana para reservas recurrentes (0: Domingo, 1: Lunes, ..., 6: Sábado)
    startTime: string, // Hora de entrada en formato HH:MM
    endTime: string, // Hora de salida en formato HH:MM
    repetitionsPerMonth: number, // Número de veces que se repite la reserva por mes
    months: number, // Número de meses durante los cuales se repiten las reservas (máximo 3 meses)
    title: string, // Título del turno
    description: string, // Descripción del turno
    price: number, // Precio del turno
    GuestListClient: string[], // Lista de invitados al turno de clientes registrados
    GuestListNotClient: string[] // Lista de invitados al turno de clientes no registrados
}

export interface IClientSpecificDayAppointment {
    clientId: string; // ID del cliente
    daysOfMonth: number[]; // Días específicos del mes para reservas recurrentes
    startTime: string; // Hora de entrada en formato HH:MM
    endTime: string; // Hora de salida en formato HH:MM
    months: number; // Número de meses durante los cuales se repiten las reservas (máximo 3 meses)
    title: string; // Título del turno
    description: string; // Descripción del turno
    price: number; // Precio del turno
    GuestListClient: string[]; // Lista de invitados al turno de clientes registrados
    GuestListNotClient: string[]; // Lista de invitados al turno de clientes no registrados
}