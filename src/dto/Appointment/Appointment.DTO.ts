export interface AppointmentDTO {
    price: number;
    date: Date; // Fecha y hora del turno
    start: Date; // Hora de entrada
    end: Date; // Hora de salida
    title: string; // Título del turno
    description: string; // Descripción del turno
    available: boolean; // Para saber si el turno esta o no disponible
    roomId: string;
}


export interface IShiftsDTO {
    days: IDaysDTO[];
    openingCloseHoursTurnos: IOpeningCloseHoursShiftsDTO[];
    roomId: string[];
}

export interface IDaysDTO {
    date: Date
}

export interface IOpeningCloseHoursShiftsDTO {
    startHours: string; // Hora de entrada
    endHours: string; // Hora de salida
    title: string; // Título del turno
    description: string; // Descripción del turno
    available: boolean; // Para saber si el turno esta o no disponible
}



export interface IShiftDTO {
    days: IDaysDTO[];
    openingCloseHoursTurnos: IOpeningCloseHoursShiftsDTO[];
    roomId: string[];
}


export interface AppointmentClientDTO {
    id: string;
    name: string;
    email: string;
    phone: string;
}