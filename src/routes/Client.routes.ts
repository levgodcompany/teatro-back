import express from 'express';
import ClientController from "../controller/Client.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para clientes
router.get('/client', checkPermissionService.checkPermissionOwner, ClientController.getAllClients);
router.get('/client/:clientId', checkPermissionService.checkPermissionClient, ClientController.getClientById);
router.put('/client/book-appointment/:clientId/add/:appointmentId', checkPermissionService.checkPermissionClient, ClientController.bookAppointment);
router.put('/client/book-appointment/:clientId/cancel/:appointmentId', checkPermissionService.checkPermissionClient, ClientController.cancelAppointment);
router.put('/client/:clientId', checkPermissionService.checkPermissionClient, ClientController.updateClient);
router.delete('/client/:clientId', checkPermissionService.checkPermissionOwner, ClientController.deleteClient);


export default router;