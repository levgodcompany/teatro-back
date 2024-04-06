import { Document, Types } from "mongoose";

export interface CRUD<T> {
    findAll():Promise<T[]>;
    findById(id:string | Types.ObjectId): Promise<T | null>;
    create(create: T): Promise<T>;
    updateById(id: string | Types.ObjectId, uppdate: T): Promise<T | null>;
    deleteById(id: string | Types.ObjectId): Promise<boolean>;
}


// FIND
export interface Email<T> {
    findByEmail(email: string): Promise<T | null>;
}