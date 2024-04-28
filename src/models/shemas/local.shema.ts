import { Schema } from "mongoose";
import {
  IAccessibilityFeature,
  IAmenity,
  IAppointment,
  IAvailability,
  IServicesOffered,
  IBookingOption,
  ICeremonyDetails,
  IClient,
  IContactInfo,
  ICoordinates,
  IDaySchedule,
  IEvent,
  IExtraService,
  IFacility,
  IIncludedService,
  ILegalInfo,
  ILocal,
  ILocation,
  IMedia,
  INearbyAttraction,
  IParkingInfo,
  IPaymentMethod,
  IPolicy,
  IPromotion,
  IRenovationDetails,
  IReview,
  ISchedule,
  IService,
  ISocialMediaLinks,
  ISpecialHours,
  IStaffMember,
  IWorkingHours,
} from "../interfaces";

// Schema for ILocal interface
export const LocalSchema = new Schema<ILocal>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  teamAndStaff: [
    { type: Schema.Types.ObjectId, ref: "StaffMember", required: true },
  ],
  appointments: [
    { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
  ],
  reviewsAndComments: [
    { type: Schema.Types.ObjectId, ref: "Review", required: true },
  ],
  category: [{ type: String }],
  subcategory: [{ type: String }],
  tags: [{ type: String }],
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  contact: { type: Schema.Types.ObjectId, ref: "ContactInfo" },
  workingHours: {
    type: Schema.Types.ObjectId,
    ref: "WorkingHours",
  },
  servicesOffered: [{ type: Schema.Types.ObjectId, ref: "Service" }],
  facilities: [{ type: Schema.Types.ObjectId, ref: "Facility" }],
  policiesAndRegulations: [{ type: Schema.Types.ObjectId, ref: "Policy" }],
  promotionsAndDiscounts: [{ type: Schema.Types.ObjectId, ref: "Promotion" }],
  eventsAndActivities: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  socialMediaLinks: { type: Schema.Types.ObjectId, ref: "SocialMediaLinks" },
  photosAndVideos: [{ type: Schema.Types.ObjectId, ref: "Media" }],
  legalAndRegistrationInfo: { type: Schema.Types.ObjectId, ref: "LegalInfo" },
  paymentMethods: [{ type: Schema.Types.ObjectId, ref: "PaymentMethod" }],
  amenities: [{ type: Schema.Types.ObjectId, ref: "Amenity" }],
  accessibilityFeatures: [
    { type: Schema.Types.ObjectId, ref: "AccessibilityFeature" },
  ],
  parkingInfo: { type: Schema.Types.ObjectId, ref: "ParkingInfo" },
  nearbyAttractions: [{ type: Schema.Types.ObjectId, ref: "NearbyAttraction" }],
  website: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  faxNumber: { type: String },
  establishedDate: { type: Date },
  closedDate: { type: Date },
  paymentTerms: { type: String },
  cancellationPolicy: { type: String },
  refundPolicy: { type: String },
  bookingOptions: [{ type: Schema.Types.ObjectId, ref: "BookingOption" }],
  languagesSpoken: [{ type: String }],
  openingCeremonyDetails: {
    type: Schema.Types.ObjectId,
    ref: "CeremonyDetails",
  },
  renovationDetails: { type: Schema.Types.ObjectId, ref: "RenovationDetails" },
  clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
});

// Schema for IContactInfo interface
export const ContactInfoSchema = new Schema<IContactInfo>({
  email: { type: String },
  phoneNumber: { type: String },
  faxNumber: { type: String },
});

// Schema for IAppointment interface
export const AppointmentSchema = new Schema<IAppointment>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  repeat: {
    type: String,
    enum: ["daily", "weekly", "monthly", null],
    required: true,
  },
  repeatTimes: { type: Number },
  available: { type: Boolean, required: true },
  guestsAllowed: { type: Boolean, required: true },
  guestsLimit: { type: Number, required: true },
  reservedBy: { type: Schema.Types.ObjectId, ref: "Client" },
  guests: [{ type: Schema.Types.ObjectId, ref: "Client" }],
  status: {
    type: String,
    enum: ["disponible", "reservado", "cancelado"],
    required: true,
  },
});

// Schema for IClient interface
export const ClientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
  dni: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
});

// Schema for IBookingOption interface
export const BookingOptionSchema = new Schema<IBookingOption>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String },
  availability: { type: Schema.Types.ObjectId, ref: "Availability" },
});

// Schema for IAvailability interface
export const AvailabilitySchema = new Schema<IAvailability>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  capacity: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
});

// Schema for ILocation interface
export const LocationSchema = new Schema<ILocation>({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String },
  coordinates: { type: Schema.Types.ObjectId, ref: "Coordinates" },
});

// Schema for ICoordinates interface
export const CoordinatesSchema = new Schema<ICoordinates>({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

// Schema for IWorkingHours interface
export const WorkingHoursSchema = new Schema<IWorkingHours>({
  days: [{ type: Schema.Types.ObjectId, ref: "DaySchedule" }],
  specialHours: [{ type: Schema.Types.ObjectId, ref: "SpecialHours" }],
});

// Schema for IDaySchedule interface
export const DayScheduleSchema = new Schema<IDaySchedule>({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

// Schema for ISpecialHours interface
export const SpecialHoursSchema = new Schema<ISpecialHours>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  description: { type: String, required: true },
});

// Schema for IIncludedService interface
export const cludedServicesSchema = new Schema<IIncludedService>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Schema for IExtraService interface
export const ExtraServiceSchema = new Schema<IExtraService>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  extraPrice: { type: Number, required: true, default: 0 },
});

// Schema for IBookableService interface
export const ServiceSchema = new Schema<IServicesOffered>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true, default: 0 },
  duration: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, required: true },
  isVIP: { type: Boolean, required: true },
  image: { type: String, required: true },
  availability: { type: String, required: true },
  capacity: { type: Boolean, required: true },
  features: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  includedServices: [cludedServicesSchema],
  extraServices: [ExtraServiceSchema],
});

// Schema for IFacility interface
export const FacilitySchema = new Schema<IFacility>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Schema for IPolicy interface
export const PolicySchema = new Schema<IPolicy>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Schema for IPromotion interface
export const PromotionSchema = new Schema<IPromotion>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  validity: { type: String },
});

// Schema for IEvent interface
export const EventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: Schema.Types.ObjectId, ref: "Schedule" },
});

// Schema for ISchedule interface
export const ScheduleSchema = new Schema<ISchedule>({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

// Schema for IStaffMember interface
export const StaffMemberSchema = new Schema<IStaffMember>({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

// Schema for IReview interface
export const ReviewSchema = new Schema<IReview>({
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

// Schema for ISocialMediaLinks interface
export const SocialMediaLinksSchema = new Schema<ISocialMediaLinks>({
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  youtube: { type: String },
  linkedin: { type: String },
  other: { type: String },
});

// Schema for IMedia interface
export const MediaSchema = new Schema<IMedia>({
  type: { type: String, enum: ["photo", "video"], required: true },
  url: { type: String, required: true },
  description: { type: String },
});

// Schema for ILegalInfo interface
export const LegalInfoSchema = new Schema<ILegalInfo>({
  businessRegistrationNumber: { type: String, required: true },
  licenses: [{ type: String, required: true }],
  healthCertificates: [{ type: String, required: true }],
  otherLegalInfo: [{ type: String }],
});

// Schema for IPaymentMethod interface
export const PaymentMethodSchema = new Schema<IPaymentMethod>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Schema for IAmenity interface
export const AmenitySchema = new Schema<IAmenity>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Schema for IAccessibilityFeature interface
export const AccessibilityFeatureSchema = new Schema<IAccessibilityFeature>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Schema for IParkingInfo interface
export const ParkingInfoSchema = new Schema<IParkingInfo>({
  available: { type: Boolean, required: true },
  type: { type: String, required: true },
  description: { type: String },
});

// Schema for INearbyAttraction interface
export const NearbyAttractionSchema = new Schema<INearbyAttraction>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  distance: { type: String, required: true },
});

// Schema for ICeremonyDetails interface
export const CeremonyDetailsSchema = new Schema<ICeremonyDetails>({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String },
});

// Schema for IRenovationDetails interface
export const RenovationDetailsSchema = new Schema<IRenovationDetails>({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String },
});
