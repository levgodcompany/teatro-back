import { Router } from "express";

import Theater from "./Theater.routes";
import Auth from "./Auth.routes";
import ReserveShift from "./ReserveShift.routes";
import Client from "./Client.routes";
import Room from "./Room.routes";
import ShiftsDay from "./ShiftsDay.routes";
import Shift from "./Shift.routes";

const router = Router();

router.use("/theater", Theater);
router.use("/auth", Auth);
router.use("/reserveShift", ReserveShift);
router.use("/client", Client);
router.use("/room", Room);
router.use("/shiftsDay", ShiftsDay);
router.use("/shift", Shift);

export default router;
