import { Document } from "mongoose";
import { CRUD } from "../repository/crud";
import { CreationError, NotFoundError } from "../utils/errors/errors";
import { DtoConverter } from "../dto/convert";
import { Crud } from "../repository/implements/crud";


export class CrudService<E extends Document, R extends Crud<E>> {

    protected entity: E | null = null;
    protected entities!: E[];
    protected repository!:R;

    constructor(repository: R) {
        this.repository = repository;
    }


    protected async findAll(){
        const resuslt = await this.repository.findAll();
        this.entities = resuslt;
        return resuslt;
    }

    protected async findById(id: string){
        const resuslt = await this.repository.findById(id);
        if(!resuslt){
            throw new NotFoundError('No encontrado')
        }

        this.entity =  resuslt;
        
        return resuslt;
    }

    protected async create(data: E): Promise<E>{
        try {
            const newData = await this.repository.create(data);
            if(!newData || newData === undefined ) throw new CreationError("No se pudo crear")
            this.entity = newData 
            return newData;
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    protected async update(id: string, data: E): Promise<E>{
        try {
            const response = await this.repository.updateById(id, data);
            if(!response) throw new NotFoundError("No se encontro  la entity")
            return response;
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

    protected async deleteById(id: string): Promise<boolean>{
        const responseTeacher = await this.repository.deleteById(id);
        return responseTeacher;
    }
    
    protected async convertDto<D>(convertDto:DtoConverter<E, D> ): Promise<D> {
        if(!this.entity) throw new NotFoundError("No se encontro la entidad")
        return convertDto(this.entity);

    }

    protected async convertDtos<U>(converter: DtoConverter<E[], U>): Promise<U | null> {
        return converter(this.entities);

    }


}