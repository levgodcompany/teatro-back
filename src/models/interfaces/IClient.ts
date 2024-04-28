import { Document } from "mongoose";

export interface IClient extends Document {
  name: string;
  lastName: string;
  dni: string;
  age: number;
  email: string;
  phone: string;
  password: string;
  token: string;
}
