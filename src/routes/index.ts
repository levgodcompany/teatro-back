import { Router } from "express";
import ClientRoutes from './Client.routes'
import AppointmentRoutes from './Appointment.routes'
import LocalRoutes from './Local.routes'
import RoomsRoutes from './Rooms.routes'
import AuthRoutes from './Auth.routes'

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/local", LocalRoutes);
router.use("/rooms", RoomsRoutes);
router.use("/appointments", AppointmentRoutes);
router.use("/clients", ClientRoutes);



export default router;