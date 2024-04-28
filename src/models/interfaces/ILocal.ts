import { Document } from "mongoose";
import { IContactInfo } from "./IContactInfo";
import { IWorkingHours } from "./IWorkingHours";
import { IFacility } from "./IFacility";
import { IPolicy } from "./IPolicy";
import { IPromotion } from "./IPromotion";
import { IEvent } from "./IEvent";
import { IStaffMember } from "./IStaffMember";
import { IReview } from "./IReview";
import { ISocialMediaLinks } from "./ISocialMediaLinks";
import { IMedia } from "./IMedia";
import { ILegalInfo } from "./ILegalInfo";
import { IPaymentMethod } from "./IPaymentMethod";
import { IAmenity } from "./IAmenity";
import { IAccessibilityFeature } from "./IAccessibilityFeature";
import { IParkingInfo } from "./IParkingInfo";
import { INearbyAttraction } from "./INearbyAttraction";
import { IBookingOption } from "./IBookingOption";
import { ICeremonyDetails } from "./ICeremonyDetails";
import { IRenovationDetails } from "./IRenovationDetails";
import { IAppointment } from "./IAppointment";
import { IClient } from "./IClient";
import { IServicesOffered } from "./IService";

// Room
export interface ILocal extends Document {
  amenities?: IAmenity[]; // Servicios y amenidades adicionales (opcional)
  appointments: IAppointment[]; // Turnos disponibles para reserva
  accessibilityFeatures?: IAccessibilityFeature[]; // Características de accesibilidad (opcional)
  bookingOptions?: IBookingOption[]; // Opciones de reserva (opcional)
  cancellationPolicy?: string; // Política de cancelación (opcional)
  category?: string[]; // Categorías o tipos de negocio (opcional)
  clients?: IClient[]; // Clientes asociados al local
  closedDate?: Date; // Fecha de cierre del local (opcional)
  contact?: IContactInfo; // Información de contacto (opcional)
  description: string; // Descripción del local
  email?: string; // Correo electrónico del local (opcional)
  establishedDate?: Date; // Fecha de establecimiento del local (opcional)
  eventsAndActivities?: IEvent[]; // Eventos y actividades (opcional)
  facilities?: IFacility[]; // Instalaciones y comodidades (opcional)
  faxNumber?: string; // Número de fax del local (opcional)
  languagesSpoken?: string[]; // Idiomas hablados en el local (opcional)
  legalAndRegistrationInfo?: ILegalInfo; // Información legal y de registro (opcional)
  location?: Location; // Ubicación del local (opcional)
  name: string; // Nombre del local
  nearbyAttractions?: INearbyAttraction[]; // Atracciones cercanas (opcional)
  openingCeremonyDetails?: ICeremonyDetails; // Detalles de la ceremonia de apertura (opcional)
  parkingInfo?: IParkingInfo; // Información sobre estacionamiento (opcional)
  paymentMethods?: IPaymentMethod[]; // Métodos de pago aceptados (opcional)
  paymentTerms?: string; // Términos de pago (opcional)
  phoneNumber?: string; // Número de teléfono del local (opcional)
  photosAndVideos?: IMedia[]; // Fotos y videos del local (opcional)
  policiesAndRegulations?: IPolicy[]; // Políticas y regulaciones (opcional)
  promotionsAndDiscounts?: IPromotion[]; // Promociones y descuentos (opcional)
  refundPolicy?: string; // Política de reembolso (opcional)
  renovationDetails?: IRenovationDetails; // Detalles de renovación del local (opcional)
  reviewsAndComments: IReview[]; // Opiniones y comentarios de clientes
  servicesOffered?: IServicesOffered[]; // Servicios ofrecidos (opcional)
  socialMediaLinks?: ISocialMediaLinks; // Enlaces a redes sociales (opcional)
  subcategory?: string[]; // Subcategorías adicionales (opcional)
  tags?: string[]; // Etiquetas para clasificar el local (opcional)
  teamAndStaff: IStaffMember[]; // Equipo y personal
  website?: string; // Sitio web del local (opcional)
  workingHours?: IWorkingHours; // Horario de trabajo (opcional)
}
