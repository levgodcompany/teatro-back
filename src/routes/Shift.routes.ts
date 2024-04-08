import { Router } from "express";
import { ShiftController } from "../controller/Shift.controller";

const shiftController = new ShiftController();
const router = Router();

/*
Realizar todos los enpoint para porder crear un nuevo turno editarlo y eliminarlo
Podes tener todos los turnos que hay en un dia
Poder consultar un solo turno en especifico

*/

router.get("/:idRoom/day", shiftController.findShiftById);

router.get("/:idRoom/shiftsday", shiftController.findAllShift);

router.post("/:idRoom", shiftController.createShift);

router.put("/:idRoom", shiftController.updateShift);

router.delete("/:idRoom", shiftController.deleteShift);

export default router;
