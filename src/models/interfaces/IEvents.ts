/**
 * Interfaz base para cualquier servicio.
 */
interface IService {
    name: string; // Nombre del servicio
    description: string; // Descripción del servicio
    price: number; // Precio del servicio
    discount?: { // Descuento opcional
        type: string; // Tipo de descuento
        value: string; // Valor del descuento
    };
    promotion?: { // Promoción opcional
        type: string; // Tipo de promoción
        value: string; // Valor de la promoción
    };
}

/**
 * Interfaz que refleja un servicio extra.
 */
interface IExtraService extends IService {
    installments?: { // Cuotas opcionales
        quantity: number; // Cantidad de cuotas
        surcharge: string; // Recargo de cuotas
    };
}

/**
 * Interfaz que refleja cualquier objeto que tenga una gestión de servicios.
 */
interface IEventHeadline {
    name: string; // Nombre del evento
    description: string; // Descripción del evento
    maxCap: number; // Capacidad máxima del evento
    images: string[]; // Imagenes del objeto
    includedService: IService[]; // Servicios incluidos
    extraService: IExtraService[]; // Servicios extra
    VIPService: IService[]; // Servicios VIP
    events: IEvent[]; // Eventos asociados
    contact: {
        phone: string; // Número de teléfono de contacto
        email: string; // Correo electrónico de contacto
        website?: string; // Sitio web del local (opcional)
    };
    workingHours: {
        days: Day[]; // Días laborables
        startTime: string; // Hora de apertura
        endTime: string; // Hora de cierre
    };
    policiesAndRegulations: string;
    teamAndStaff: StaffMember[]; // Equipo y personal
    photosAndVideos?: Media[]; // Fotos y videos (opcional)
}

interface StaffMember {
    name: string; // Nombre del miembro del personal
    role: string; // Rol o función en el local
}

// Interfaz para representar medios de fotos y videos
interface Media {
    type: "photo" | "video"; // Tipo de medio (foto o video)
    url: string; // URL del medio
    description?: string; // Descripción del medio (opcional)
}


/**
 * Interfaz que refleja un evento.
 */
interface IEvent {
    name: string; // Nombre del evento
    description: string; // Descripción del evento
    schedule: ISchedule; // Horario del evento
    repeat: IRepeat; // Frecuencia de repetición del evento
    reservedBy: IUser; // Persona que reservó el evento
    guestList: IUser[]; // Lista de invitados
}

/**
 * Interfaz que refleja la programación de un evento.
 */
interface ISchedule {
    startTime: string; // Hora de inicio del evento
    endTime: string; // Hora de finalización del evento
}

/**
 * Interfaz que refleja la repetición de un evento.
 */
interface IRepeat {
    frequency: "monthly" | "weekly" | "none"; // Frecuencia de repetición del evento
    repeat: number; // Número de veces que se repite el evento
    day: Day[]; // Días de la semana en los que se repite el evento
    dayMonthly: number[]; // Días del mes en los que se repite el evento
}

/**
 * Interfaz que refleja los días de la semana.
 */
type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

/**
 * Interfaz que refleja la información de un cliente
 */
interface IUser {
    name: string; // Nombre del cliente
    lastName: string; // Apellido del cliente
    email: string; // Correo electrónico del cliente
}
