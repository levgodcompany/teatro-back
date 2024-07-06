import { sendEmail } from "../config/emailConfig";
import { ClientModel, OwnerModel } from "../models/schema/ISchema.schema";
import { Bcrypt } from "../utils/bccrypt.handle";
import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errors/errors";
import ClientService from "./Client.service";
import OwnerService from "./Owner.service";

class AuthService {
  async login(email: string, password: string) {
    try {
      const client = await ClientModel.findOne({ email: email });
      if (!client) {
        throw new NotFoundError(`No se encontro el cliente`);
      }

      const bccy = new Bcrypt();
      const passEncript = await bccy.encrypt(password);
      const isCheck = await bccy.verified(password, client.password);
      if (!isCheck) throw new UnauthorizedError(`password incorrecta`);

      return client;
    } catch (error) {
      throw new Error(`Error al hacer login: ${error}`);
    }
  }

  async registerNewUser(
    name: string,
    email: string,
    phone: string,
    password: string
  ) {
    try {
      const client = await ClientModel.findOne({ email: email });
      if (!client) {
        const bccy = new Bcrypt();
        const passEncript = await bccy.encrypt(password);

        const keyToken = (longitud = 12): string => {
          const caracteres =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let pass = "";
          for (let i = 0; i < longitud; i++) {
            const caracterAleatorio = caracteres.charAt(
              Math.floor(Math.random() * caracteres.length)
            );
            pass += caracterAleatorio;
          }

          return pass;
        };

        const token = await this.generateToken(keyToken(20));

        const newClient = ClientService.createClient(
          name,
          email,
          phone,
          passEncript,
          token
        );

        return newClient;
      }

      throw new Error(`El cliente ya esta registrado`);
    } catch (error) {
      throw new Error(`Error al registarce: ${error}`);
    }
  }

  async newPassword(email: string) {
    try {
      const client = await ClientModel.findOne({ email: email });
      if (!client) {
        throw new NotFoundError(`No se encontro el cliente`);
      }

      const newPassw = (longitud = 12): string => {
        const caracteres =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let pass = "";
        for (let i = 0; i < longitud; i++) {
          const caracterAleatorio = caracteres.charAt(
            Math.floor(Math.random() * caracteres.length)
          );
          pass += caracterAleatorio;
        }

        return pass;
      };

      const newPass = newPassw(10);
      const bccy = new Bcrypt();
      const passEncript = await bccy.encrypt(newPass);

      client.password = passEncript;

      const clRes = await ClientModel.findByIdAndUpdate(
        client._id,
        client,
        { new: true }
      );

      if (clRes != null) {
        sendEmail(
          email,
          "Nueva contraseña",
          `Esta es tu nueva contraseña ${newPass}`
        );
      }

      return client;
    } catch (error) {
      throw new Error(`Error al hacer login: ${error}`);
    }
  }

  async loginOwner(email: string, password: string) {
    try {
      const owner = await OwnerModel.findOne({ email: email });
      if (!owner) {
        throw new NotFoundError(`No se encontro el owner`);
      }

      const bccy = new Bcrypt();
      const isCheck = await bccy.verified(password, owner.password);
      if (!isCheck) throw new UnauthorizedError(`password incorrecta`);

      return owner;
    } catch (error) {
      throw new Error(`Error al hacer Owner: ${error}`);
    }
  }

  async registerNewOwer(
    name: string,
    email: string,
    phone: string,
    password: string
  ) {
    try {
      const owner = await OwnerModel.findOne({ email: email });
      if (!owner) {
        const bccy = new Bcrypt();
        const passEncript = await bccy.encrypt(password);

        const keyToken = (longitud = 12): string => {
          const caracteres =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let pass = "";
          for (let i = 0; i < longitud; i++) {
            const caracterAleatorio = caracteres.charAt(
              Math.floor(Math.random() * caracteres.length)
            );
            pass += caracterAleatorio;
          }

          return pass;
        };

        const token = await this.generateToken(keyToken(20));

        const newOwner = OwnerService.createOwner(
          name,
          email,
          phone,
          passEncript,
          token
        );

        return newOwner;
      }

      throw new Error(`El Owner ya esta registrado`);
    } catch (error) {
      throw new Error(`Error al registarce: ${error}`);
    }
  }

  private async generateToken(data: string) {
    const bccy = new Bcrypt();
    return await bccy.jwtCreate({ userId: data });
  }
}

export default new AuthService();
