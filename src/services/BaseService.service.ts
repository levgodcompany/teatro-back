import { Document } from "mongoose";
import { BaseRepository } from "../repository/implements/BaseRepository";
import { CreationError, NotFoundError } from "../utils/errors/errors";
import { DtoConverter } from "../dto/convert";
import { IRepository } from "../repository/crud";
import { IGenericService } from "./interfaces/crud.interface";

// Clase de servicio genérico (Principio de responsabilidad única)
export abstract class GenericService<T extends Document> implements IGenericService<T> {
  protected repository: IRepository<T>;

  constructor(repository: IRepository<T>) {
    this.repository = repository;
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async create(data: T): Promise<T> {
    return await this.repository.create(data);
  }

  async updateById(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repository.updateById(id, data);
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.repository.deleteById(id);
  }
}