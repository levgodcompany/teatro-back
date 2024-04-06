import { Router } from "express";
import { ShiftsDayController } from "../controller/ShiftsDay.controller";


const shiftsDayController = new ShiftsDayController();
const router = Router();


router.get('/:idRoom/day/', shiftsDayController.findShiftDayById);


router.get('/:idRoom', shiftsDayController.findAllShiftDay);


router.post('/:idRoom', shiftsDayController.createShiftDay);

router.put('/:idRoom', shiftsDayController.updateShiftDay);


router.delete('/:idRoom', shiftsDayController.deleteShiftDay);

export default router;