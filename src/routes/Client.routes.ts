import { Router } from "express";
import { ClientController } from "../controller/Client.controller";

const clientController = new ClientController();
const router = Router();

// Ruta para obtener el teatro
router.put("/:idClient", clientController.updateClient);

// Ruta para crear el teatro
router.delete("/:idClient", clientController.deleteClient);

router.get("/all", clientController.findAllClient);

router.get("/:idClient", clientController.findAllRoomById);




// Ruta para obtener el teatro
// router.post("/login/admin", authController.loginClient);

// Ruta para crear el teatro
// router.post("/register/admin", authController.registerClient);

export default router;