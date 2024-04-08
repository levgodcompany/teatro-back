import { Router } from "express";
import { ClientController } from "../controller/Client.controller";
import { ReserveShiftController } from "../controller/ReserveShift.controller";

const reserveShiftController = new ReserveShiftController();
const router = Router();



router.post("/cancelable", reserveShiftController.cancelableUntilReserveShify);

router.post("/reserve", reserveShiftController.reserveShift);

router.post("/confirm", reserveShiftController.confirmedShift);




// Ruta para obtener el teatro
// router.post("/login/admin", authController.loginClient);

// Ruta para crear el teatro
// router.post("/register/admin", authController.registerClient);

export default router;