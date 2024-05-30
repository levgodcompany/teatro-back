import express from 'express';
import AppointmentController from "../controller/Appointment.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para turnos
router.post('/appointment', checkPermissionService.checkPermissionOwner, AppointmentController.createAppointment);
router.post('/appointment/all', checkPermissionService.checkPermissionOwner, AppointmentController.createAllAppointmet);
router.get('/appointment', checkPermissionService.checkPermissionClient, AppointmentController.getAllAppointments);
router.delete('/room/:idRoom/appointment/:appointmentId', checkPermissionService.checkPermissionOwner, AppointmentController.deleteAppointment);



export default router;