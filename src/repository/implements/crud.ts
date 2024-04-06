import { Document } from "mongoose";
import { CRUD } from "../crud";
import { Model, Types } from "mongoose";

export abstract class Crud<T extends Document> implements CRUD<T> {


    protected schema!: Model<T>;


    async findAll(): Promise<T[]> {
        return await this.schema.find({});
    }


    async findById(id: string | Types.ObjectId,): Promise<T | null> {
        try {
            const responseTeacher = await this.schema.findOne({ _id: id });
            return responseTeacher
          } catch (error) {
            throw new Error(`Error al buscar por ID: ${error}`);
          }
    }
    async create(create: T): Promise<T> {
        try {  
          const responseInsert = await this.schema.create(create);

            return responseInsert;
          } catch (error) {

            throw new Error(`Error al crear: ${error}`);
          }
    }
    async updateById(id: string | Types.ObjectId, update: Partial<T>): Promise<T | null> {
        try {
          const response = await this.schema.findByIdAndUpdate(id, update, { new: true });
          return response;
          } catch (error) {
            throw new Error(`Error al actualizar por ID: ${error}`);
          }
    }
    async deleteById(id: string | Types.ObjectId): Promise<boolean> {
        try {
            const responseTeacher =await this.schema.deleteOne({_id:id});
            return !responseTeacher;
          } catch (error) {
            throw new Error(`Error al eliminar por ID: ${error}`);
          }
    }

}