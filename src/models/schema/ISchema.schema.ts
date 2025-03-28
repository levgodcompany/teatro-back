import mongoose, { Schema } from "mongoose";
import {
  DtoRoom,
  IAppointment,
  IClient,
  IClientNotRegister,
  IDtoAppointment,
  IImage,
  ILocal,
  IOpeningCloseHours,
  IOpeningDays,
  IOwner,
  IRoom,
} from "../interfaces/ILocal.interface";

const ClientSchema: Schema = new Schema<IClient>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  password: { type: String, required: true },
  token: { type: String, required: true },
  bookedAppointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
});

const ClientNotRegisterSchema: Schema = new Schema<IClientNotRegister>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  bookedAppointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
});

const OwnerSchema: Schema = new Schema<IOwner>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
});

const DtoAppointmentSchema: Schema = new Schema<IDtoAppointment>({
  dto: {type: Number, default: 0},
  prevPrice: {type: Number, default: 0},
  newPrice: {type: Number, default: 0}
})

const AppointmentSchema: Schema = new Schema<IAppointment>({
  date: { type: Date, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  title: { type: String, required: true },
  price: {type: Number, required: true, default: 0},
  description: { type: String, required: true },
  available: { type: Boolean, required: true },
  dto: {type: DtoAppointmentSchema, default: null},
  client: { type: Schema.Types.ObjectId, ref: "Client", default: null },
  GuestListClient: [{ type: Schema.Types.ObjectId, ref: "Client", default: [] }],
  GuestListNotClient: [{ type: Schema.Types.ObjectId, ref: "Client_not_register", default: [] }],
});

// Definición del esquema de imagen
const ImageSchema: Schema = new Schema<IImage>({
  url: { type: String, default: "" },
  description: { type: String },
});

const OpeningCloseHoursSchema: Schema = new Schema<IOpeningCloseHours>({
  isOpen: { type: Boolean, default: false },
  open: { type: String, default: "" },
  close: { type: String,  default: "" },
});

const OpeningDaysSchema: Schema = new Schema<IOpeningDays>({
  monday: { type: OpeningCloseHoursSchema },
  tuesday: { type: OpeningCloseHoursSchema },
  wednesday: { type: OpeningCloseHoursSchema },
  thursday: { type: OpeningCloseHoursSchema },
  friday: { type: OpeningCloseHoursSchema },
  saturday: { type: OpeningCloseHoursSchema },
  sunday: { type: OpeningCloseHoursSchema },
});


const DtoRoomSchema: Schema = new Schema<DtoRoom>({
  dto: {type: Number, default: 0},
  endHour: {type: String, default: ""},
  startHour: {type: String, default: ""}
})

const RoomSchema: Schema = new Schema<IRoom>({
  name: { type: String, required: true },
  capacity: { type: Number, required: true, default: 0 },
  priceBase: { type: Number, required: true, default: 0 },
  availableAppointments: [AppointmentSchema],
  mainImage: { type: ImageSchema, required: true },
  additionalImages: [ImageSchema],
  phone: { type: String, default: "" },
  openingHours: { type: OpeningDaysSchema },
  description: { type: String, default: "" },
  services: [{ type: String, required: true }],
  dtoRoomHours: [DtoRoomSchema],
  length: {type: String, required: true, default: "0"},
  Width: {type: String, required: true, default: "0"},
  typeRoom: {type: String, required: true, default: ""}
});




const LocalSchema: Schema = new Schema<ILocal>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  openingHours: { type: OpeningDaysSchema },
  mainImage: { type: ImageSchema, required: true },
  additionalImages: [ImageSchema],
  description: { type: String, required: true },
  services: [{ type: String, required: true }],
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
});

// Definir el modelo
const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
const ClientModel = mongoose.model<IClient>("Client", ClientSchema);
const ClientNotRegisterModel = mongoose.model<IClientNotRegister>("Client_not_register", ClientNotRegisterSchema);
const OwnerModel = mongoose.model<IOwner>("Owner", OwnerSchema);
const AppointmentModel = mongoose.model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
const LocalModel = mongoose.model<ILocal>("Local", LocalSchema);

export { ClientModel, ClientNotRegisterModel,  AppointmentModel, RoomModel, LocalModel, OwnerModel };
