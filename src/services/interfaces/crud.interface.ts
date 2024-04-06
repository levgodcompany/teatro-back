import { Types } from "mongoose";

export type typeBootcamp = 'introduction' | 'fundamentals' | 'frontEnd' | 'backEnd' | 'databases' | 'finalProjects' | 'english'

export interface CrudRef <T>{
    findRefAll(typeBootcamp: typeBootcamp):Promise<T[]>;
    findRefById(typeBootcamp: typeBootcamp  ,id:string | Types.ObjectId): Promise<T>;
    createRef(typeBootcamp: typeBootcamp, create: T): Promise<T>;
    updateRefById(typeBootcamp: typeBootcamp, id: string | Types.ObjectId, uppdate: T): Promise<T>;
    deleteRefById(typeBootcamp: typeBootcamp, id: string | Types.ObjectId): Promise<boolean>;
}