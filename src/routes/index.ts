import { Router } from "express";

import Theater from './Theater.routes';
import Room from './Room.routes';
import ShiftsDay from './ShiftsDay.routes';
import Shift from './Shift.routes';

const router = Router();


router.use("/theater", Theater );
router.use("/room", Room );
router.use("/shiftsDay", ShiftsDay );
router.use("/shift", Shift );



export default router;


