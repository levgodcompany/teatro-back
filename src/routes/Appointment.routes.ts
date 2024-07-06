import express from 'express';
import AppointmentController from "../controller/Appointment.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para turnos
router.get('/:idRoom', checkPermissionService.checkPermissionClient, AppointmentController.getAllAppointments);
router.post('/new/appointment/:idRoom', checkPermissionService.checkPermissionOwner, AppointmentController.createAppointment);
router.put('/room/:idRoom/appointment/:appointmentId', checkPermissionService.checkPermissionOwner, AppointmentController.updateAppointment);
router.post('/appointment/all', checkPermissionService.checkPermissionOwner, AppointmentController.createAllAppointmet);
router.delete('/room/:idRoom/appointment/:appointmentId', checkPermissionService.checkPermissionClient, AppointmentController.deleteAppointment);

router.get('/appointment-all-clients/room/:idRoom/appointment/:appointmentId', checkPermissionService.checkPermissionOwner, AppointmentController.getAllClientAppointments);
router.get('/appointment-all-not-clients', checkPermissionService.checkPermissionOwner, AppointmentController.getAllAppointments);
router.get('/organizador/room/:idRoom/appointment/:appointmentId', checkPermissionService.checkPermissionOwner, AppointmentController.getClientAppointment);

export default router;