import { NextFunction, Request, Response } from "express";
import { ClientModel, OwnerModel } from "../models/schema/ISchema.schema";
import { AuthenticationError, NotFoundError } from "../utils/errors/errors";

class CheckPermissionService {
  // Middleware para verificar si el usuario tiene permiso para acceder a la ruta
  async checkPermissionOwner(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const userOwner = await OwnerModel.findOne({ token: authHeader });
      if (userOwner) {
        next();
      } else {
        throw new AuthenticationError(`Unauthorized`);
      }
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }
  }

  async checkPermissionClient(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send("Unauthorized");
    }

    try {
      const user = await ClientModel.findOne({ token: authHeader });

      if (!user) {
        throw new Error();
      }
      next();
    } catch (error) {
      try {

        const userOwner = await OwnerModel.findOne({ token: authHeader });
        if (userOwner) {
          next();
        } else {
          throw new AuthenticationError(`Unauthorized`);
        }
      } catch (error) {
        return res.status(401).send("Unauthorized");
      }
    }
  }
}

export default new CheckPermissionService();
