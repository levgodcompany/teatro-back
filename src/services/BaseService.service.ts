import { Document } from "mongoose";
import { BaseRepository } from "../repository/implements/BaseRepository";
import { CreationError, NotFoundError } from "../utils/errors/errors";
import { DtoConverter } from "../dto/convert";
import { IRepository } from "../repository/crud";
import { IGenericService } from "./interfaces/crud.interface";

export class BaseService<E extends Document, R extends BaseRepository<E>> {
  protected entity: E | null = null;
  protected entities!: E[];
  protected repository!: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  protected async findAll() {
    const resuslt = await this.repository.findAll();
    this.entities = resuslt;
    return resuslt;
  }

  protected async findById(id: string) {
    const resuslt = await this.repository.findById(id);
    if (!resuslt) {
      throw new NotFoundError("No encontrado");
    }

    this.entity = resuslt;

    return resuslt;
  }

  protected async create(data: E): Promise<E> {
    try {
      const newData = await this.repository.create(data);
      if (!newData || newData === undefined)
        throw new CreationError("No se pudo crear");
      this.entity = newData;
      return newData;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  protected async update(id: string, data: E): Promise<E> {
    try {
      const response = await this.repository.updateById(id, data);
      if (!response) throw new NotFoundError("No se encontro  la entity");
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  protected async deleteById(id: string): Promise<boolean> {
    const responseTeacher = await this.repository.deleteById(id);
    return responseTeacher;
  }

  protected async convertDto<D>(convertDto: DtoConverter<E, D>): Promise<D> {
    if (!this.entity) throw new NotFoundError("No se encontro la entidad");
    return convertDto(this.entity);
  }

  protected async convertDtos<U>(
    converter: DtoConverter<E[], U>
  ): Promise<U | null> {
    return converter(this.entities);
  }
}



// Clase de servicio genérico (Principio de responsabilidad única)
export abstract class GenericService<T extends Document> implements IGenericService<T> {
  protected readonly repository: IRepository<T>;

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