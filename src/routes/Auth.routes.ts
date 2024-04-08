import { Router } from "express";
import { AuthController } from "../controller/Auth.controller";

const authController = new AuthController();
const router = Router();

// Ruta para obtener el teatro
router.post("/login/client", authController.loginClient);

// Ruta para crear el teatro
router.post("/register/client", authController.registerClient);

// Ruta para obtener el teatro
// router.post("/login/admin", authController.loginClient);

// Ruta para crear el teatro
// router.post("/register/admin", authController.registerClient);

export default router;