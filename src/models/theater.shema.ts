import { Schema, model, Document } from "mongoose";
import {
  IAdmin,
  ITheater,
} from "./interfaces";
import { LocalSchema } from "./shemas/local.shema";

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: String, required: true },
  email: { type: String, required: false },
  token: { type: String, required: true },
});


export const theaterSchema = new Schema<ITheater>({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  rooms: [LocalSchema],
  admins: [adminSchema],
});
