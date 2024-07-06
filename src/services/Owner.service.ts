import { IOwner } from "../models/interfaces/ILocal.interface";
import { OwnerModel } from "../models/schema/ISchema.schema"

class OwnerService {
  // Método para crear un nuevo Ownere
  async createOwner(name: string, email: string, phone: string, password: string, token: string) {
    try {
      const newOwner = await OwnerModel.create({ name, email, phone, password, token });
      return newOwner;
    } catch (error) {
      throw new Error(`Error al crear Ownere: ${error}`);
    }
  }

  // Método para obtener todos los Owneres
  async getAllOwners() {
    try {
      const owners = await OwnerModel.find();
      return owners;
    } catch (error) {
      throw new Error(`Error al obtener Owneres: ${error}`);
    }
  }

  // Método para obtener un Ownere por su ID
  async getOwnerById(ownerId: string) {
    try {
      const owner = await OwnerModel.findById(ownerId);
      return owner;
    } catch (error) {
      throw new Error(`Error al obtener Ownere: ${error}`);
    }
  }

  // Método para obtener un Ownere por su ID
  async getOwnerByEmail(email: string) {
    try {
      const owner = await OwnerModel.findOne({ email: email });
      return owner;
    } catch (error) {
      throw new Error(`Error al obtener Ownere: ${error}`);
    }
  }


  // Método para actualizar un Ownere existente
  async updateOwner(ownerId: string, updatedData: Partial<IOwner>) {
    try {
      const owner = await OwnerModel.findByIdAndUpdate(ownerId, updatedData, { new: true });
      return owner;
    } catch (error) {
      throw new Error(`Error al actualizar Ownere: ${error}`);
    }
  }

  // Método para eliminar un Ownere
  async deleteOwner(ownerId: string): Promise<void> {
    try {
      await OwnerModel.findByIdAndDelete(ownerId);
    } catch (error) {
      throw new Error(`Error al eliminar Ownere: ${error}`);
    }
  }





}

export default new OwnerService();
