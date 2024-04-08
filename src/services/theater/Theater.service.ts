import { ITheater } from "../../models/interfaces/theater";
import { TheaterRepository } from "../../repository/implements/theater.repository";
import { Bcrypt } from "../../utils/bccrypt.handle";
import { NotFoundError } from "../../utils/errors/errors";
import { CrudService } from "../crud.service";

export class TheaterService extends CrudService<ITheater, TheaterRepository> {
  constructor() {
    super(new TheaterRepository());
  }

  async getTheater() {
    const TheaterAll = await super.findAll();
    if (TheaterAll.length == 0) {
      throw new NotFoundError(`No se encontro el teatro`);
    }

    return TheaterAll[0];
  }

  async createTheater(Theater: ITheater) {
    const TheaterAll = await super.findAll();
    if (TheaterAll.length == 0) {
      //const bccy = new Bcrypt();

      //const admin = Theater.admins[0]

      //admin.token = await bccy.jwtCreate(admin.email);
      //Theater.admins[0] = admin;
      const newTheater = await super.create(Theater);

      return newTheater;
    } else {
      throw new Error(`El Theater ya existe`);
    }
  }

  async updateTheater(TheaterUp: ITheater) {
    return await super.update(TheaterUp._id, TheaterUp);
  }

  async deleteTheater() {
    const Theater = await this.getTheater();
    return await super.deleteById(Theater._id);
  }
}
