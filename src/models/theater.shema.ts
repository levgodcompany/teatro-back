import { Schema, model, Document } from 'mongoose';
import { Admin, Client, IDimensions, IRoom, IShift, IShiftsDay, ITheater } from './interfaces/theater';


const dimensionsSchema = new Schema<IDimensions>({
    length: { type: String, required: true },
    width: { type: String, required: true },
    height: { type: String, required: true }
  });
  
  const shiftSchema = new Schema<IShift>({
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    rentedBy: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      altPhone: { type: String }
    },
    reservedOn: { type: String },
    bookedOn: { type: Date },
    cancelableUntil: { type: Date },
    canceled: { type: Boolean, default: false },
    reserved: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false }
  });

  const shiftsDaySchema = new Schema<IShiftsDay>({
    day: { type: String, required: true },
    shifts: [{ type: shiftSchema, required: true }]
  });
  
  
  const roomSchema = new Schema<IRoom>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    dimensions: { type: dimensionsSchema, required: true },
    imgs: [{ type: String, required: true }],
    value: { type: String, required: true },
    shiftsDay: [{ type: shiftsDaySchema, required: true }]
  });
  
  const adminSchema = new Schema<Admin>({
    name: { type: String, required: true },
    lasName: { type: String, required: true },
    dni: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: false  },
    reservedRoom: [{ type: roomSchema }],
    token: { type: String, required: true }
  });
  
  const clientSchema = new Schema<Client>({
    name: { type: String, required: true },
    lasName: { type: String, required: true },
    dni: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: false  },
    cel: { type: String, required: true },
    reservedRoom: [{ type: roomSchema}],
    token: { type: String, required: true }
  });
  
  const theaterSchema = new Schema<ITheater>({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    rooms: [roomSchema],
    clients: [clientSchema],
    admins: [adminSchema]
  });
  
  const TheaterModel = model<ITheater>('theater', theaterSchema);
  
  export { TheaterModel };