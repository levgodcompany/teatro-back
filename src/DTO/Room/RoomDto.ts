import { DtoRoom, IImage, IOpeningDays } from "../../models/interfaces/ILocal.interface";

export interface RoomDTO {
    name: string; // Nombre de la sala
    price: number;
    capacity: number; // Capacidad máxima de personas en la sala
    phone: string; // Número de teléfono del local
    openingHours: IOpeningDays; // Horario de apertura
    mainImage: IImage; // Imagen principal del local
    additionalImages: IImage[]; // Lista de imágenes adicionales del local
    description: string; // Descripción del local
    services: string[]; // Lista de servicios que ofrece el local
    dtoRoomHours: DtoRoom[];
    length: string;
    Width: string;
    typeRoom: string;
}

export interface RoomIdName {
    id: string;
    name: string;
}