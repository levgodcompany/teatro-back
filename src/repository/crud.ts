import { Document, Types } from "mongoose";

export interface CRUD<T> {
    findAll():Promise<T[]>;
    findById(id:string | Types.ObjectId): Promise<T | null>;
    create(create: T): Promise<T>;
    updateById(id: string | Types.ObjectId, uppdate: T): Promise<T | null>;
    deleteById(id: string | Types.ObjectId): Promise<boolean>;
}

export interface IRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    updateById(id: string, data: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<boolean>;
  }

// FIND
export interface Email<T> {
    findByEmail(email: string): Promise<T | null>;
}