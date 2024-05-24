import express from 'express';
import AppointmentController from "../controller/Appointment.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para turnos
router.post('/appointment', checkPermissionService.checkPermissionOwner, AppointmentController.createAppointment);
router.get('/appointment', checkPermissionService.checkPermissionClient, AppointmentController.getAllAppointments);
router.delete('/appointment/:appointmentId', checkPermissionService.checkPermissionOwner, AppointmentController.deleteAppointment);



export default router;