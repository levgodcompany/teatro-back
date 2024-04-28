import { model, Schema } from "mongoose";
import * as LocalSchemas from "./shemas/local.shema";
import { theaterSchema } from "./theater.shema";

// Desestructuramos los esquemas locales del objeto LocalSchemas
const {
  AccessibilityFeatureSchema,
  AmenitySchema,
  AppointmentSchema,
  AvailabilitySchema,
  BookingOptionSchema,
  CeremonyDetailsSchema,
  ClientSchema,
  ContactInfoSchema,
  CoordinatesSchema,
  DayScheduleSchema,
  EventSchema,
  FacilitySchema,
  LegalInfoSchema,
  LocalSchema,
  LocationSchema,
  MediaSchema,
  NearbyAttractionSchema,
  ParkingInfoSchema,
  PaymentMethodSchema,
  PolicySchema,
  PromotionSchema,
  RenovationDetailsSchema,
  ReviewSchema,
  ScheduleSchema,
  ServiceSchema,
  SocialMediaLinksSchema,
  SpecialHoursSchema,
  StaffMemberSchema,
  WorkingHoursSchema,
} = LocalSchemas;

// Creamos un tipo genérico para los modelos de MongoDB
type Model<T> = T & Document;

// Creamos un objeto que mapea los esquemas y nombres de modelo
const modelsMap: Record<string, Schema> = {
  TheaterModel: theaterSchema,
  AccessibilityFeatureModel: AccessibilityFeatureSchema,
  AmenityModel: AmenitySchema,
  AppointmentModel: AppointmentSchema,
  AvailabilityModel: AvailabilitySchema,
  BookingOptionModel: BookingOptionSchema,
  CeremonyDetailsModel: CeremonyDetailsSchema,
  ClientModel: ClientSchema,
  ContactInfoModel: ContactInfoSchema,
  CoordinatesModel: CoordinatesSchema,
  DayScheduleModel: DayScheduleSchema,
  EventModel: EventSchema,
  FacilityModel: FacilitySchema,
  LegalInfoModel: LegalInfoSchema,
  LocalModel: LocalSchema,
  LocationModel: LocationSchema,
  MediaModel: MediaSchema,
  NearbyAttractionModel: NearbyAttractionSchema,
  ParkingInfoModel: ParkingInfoSchema,
  PaymentMethodModel: PaymentMethodSchema,
  PolicyModel: PolicySchema,
  PromotionModel: PromotionSchema,
  RenovationDetailsModel: RenovationDetailsSchema,
  ReviewModel: ReviewSchema,
  ScheduleModel: ScheduleSchema,
  ServiceModel: ServiceSchema,
  SocialMediaLinksModel: SocialMediaLinksSchema,
  SpecialHoursModel: SpecialHoursSchema,
  StaffMemberModel: StaffMemberSchema,
  WorkingHoursModel: WorkingHoursSchema,
};

// Creamos los modelos dinámicamente utilizando el objeto modelsMap
const models: Record<string, Model<any>> = {};
for (const [modelName, schema] of Object.entries(modelsMap)) {
  models[modelName] = model(modelName, schema);
}

// Exportamos los modelos
export default models;