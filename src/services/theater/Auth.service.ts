import { Auth, RegisterClientAuthDto } from "../../dto/auth";
import { ClientModel } from "../../models/theater.shema";
import { Bcrypt } from "../../utils/bccrypt.handle";
import { NotFoundError, UnauthorizedError } from "../../utils/errors/errors";
import { ClientService } from "./Client.service";

export class AuthService {
  async loginClient(auht: Auth) {
    const clientService = new ClientService();
    const client = await clientService.findClientByEmailPass(auht);

    return client;
  }

  async registerClient(newClient: RegisterClientAuthDto) {
    const clientService = new ClientService();

    const generatePassword = (longitud = 12): string => {
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

    const token = await this.generateToken(generatePassword(20));

    const bccy = new Bcrypt();
    const passEncript = await bccy.encrypt(newClient.password);

    const clientModel = new ClientModel({
      ...newClient,
      dni: "",
      age: 0,
      password: passEncript,
      reservedRoom: [],
      token: token,
    });

    const client = await clientService.createClient(clientModel);
    return client;
  }

  private async generateToken(data: string) {
    const bccy = new Bcrypt();
    return await bccy.jwtCreate({ userId: data });
  }
}
