import { ILocalDTO } from "../DTO/Local/local.dto";
import { ILocal } from "../models/interfaces/ILocal.interface";
import { LocalModel } from "../models/schema/ISchema.schema";
import { NotFoundError } from "../utils/errors/errors";
import mongoose, { ObjectId } from 'mongoose';

class LocalService {
  async createLocal(localDTO: ILocalDTO) {
    try {
      const exit = await LocalModel.find();
      if (exit.length > 0) {
        throw new Error("El Local ya esta creado");
      }
      const newLocal = await LocalModel.create({
        name: localDTO.name, // Nombre del local
        address: localDTO.address, // Dirección del local
        phone: localDTO.phone, // Número de teléfono del local
        email: localDTO.email, // Correo electrónico del local
        openingHours: localDTO.openingHours, // Horario de apertura
        mainImage: localDTO.mainImage, // Imagen principal del local
        additionalImages: localDTO.additionalImages, // Lista de imágenes adicionales del local
        description: localDTO.description, // Descripción del local
        services: localDTO.services, // Lista de servicios que ofrece el local
        rooms: [],
      });
      return newLocal;
    } catch (error) {
      throw new Error(`Error al crear local: ${error}`);
    }
  }

  async getAllLocals() {
    try {
      const locals = await LocalModel.find().populate("rooms");
      return locals;
    } catch (error) {
      throw new Error(`Error al obtener locales: ${error}`);
    }
  }

  async getLocalID() {
    try {
      const locals = await LocalModel.find().populate("rooms");
      if(locals.length > 0){
        return `${locals[0]._id}`; // Convertir ObjectId a cadena de texto

      }
      throw new NotFoundError(`El local no esta creado`);
    } catch (error) {
      throw new Error(`Error al obtener el id del local: ${error}`);
    }
  }

  async getLocalById(localId: string) {
    try {
      const local = await LocalModel.findById(localId).populate("rooms");
      return local;
    } catch (error) {
      throw new Error(`Error al obtener local: ${error}`);
    }
  }

  async addRoomToLocal(localId: string, roomId: string) {
    try {
      const local = await LocalModel.findByIdAndUpdate(
        localId,
        { $push: { rooms: roomId } },
        { new: true }
      ).populate("rooms");
      return local;
    } catch (error) {
      throw new Error(`Error al agregar sala al local: ${error}`);
    }
  }

  async updateLocalInformaton(idLocal: string, localDTO: Partial<ILocalDTO>) {
    try {
      const local: Partial<ILocal> = localDTO;
      const updateLocal = await LocalModel.findByIdAndUpdate(idLocal, {
        ...local
      },  { new: true });
      return updateLocal;
    } catch (error) {
      throw new Error(`Error al actualizar el local: ${error}`);
    }
  }
}

export default new LocalService();
