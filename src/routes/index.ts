import { Router } from "express";
import ClientRoutes from './Client.routes'
import ClientNotRegisterRoutes from './ClientNotRegister.routes'
import AppointmentRoutes from './Appointment.routes'
import LocalRoutes from './Local.routes'
import RoomsRoutes from './Rooms.routes'
import AuthRoutes from './Auth.routes'
import FirebaseRoutes from './Firebase.routes'

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/fire", FirebaseRoutes);
router.use("/local", LocalRoutes);
router.use("/rooms", RoomsRoutes);
router.use("/appointments", AppointmentRoutes);
router.use("/clients", ClientRoutes);
router.use("/not-clients", ClientNotRegisterRoutes);



export default router;