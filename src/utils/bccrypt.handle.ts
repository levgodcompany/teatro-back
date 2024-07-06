import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";


export class Bcrypt {

  private jwtSecret = "teatro"

  // Encriptamos la password
  async encrypt(pass: string) {
    const passwordHash = await hash(pass, 8);
    return passwordHash;
  };

  // varificamos la password
  async verified (pass: string, passHash: string) {
    const isCorrect = await compare(pass, passHash);
    return isCorrect;
  };

  // Crear un token JWT
  async jwtCreate(payload: any) {
    return jwt.sign(payload, this.jwtSecret);
  }

  // Verificar un token JWT
  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      // Manejar el error si el token no es válido
      console.error("Error al verificar el token:", error);
      return null;
    }
  };


}
