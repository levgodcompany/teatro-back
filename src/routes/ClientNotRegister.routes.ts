import express from 'express';
import ClientNotRegisterController from "../controller/ClientNotRegister.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para clientes
router.post('/client', checkPermissionService.checkPermissionClient, ClientNotRegisterController.register);


export default router;