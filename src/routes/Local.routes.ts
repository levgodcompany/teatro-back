import express from 'express';
import LocalController from "../controller/Local.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para locales
router.post('/local', checkPermissionService.checkPermissionOwner, LocalController.createLocal);
router.get('/local', checkPermissionService.checkPermissionOwner, LocalController.getAllLocals);
router.get('/id', checkPermissionService.checkPermissionClient, LocalController.getLocalID);
router.get('/local/:localId', checkPermissionService.checkPermissionClient, LocalController.getLocalById);
router.put('/local/:localId', checkPermissionService.checkPermissionOwner, LocalController.updateLocalInfo);
router.put('/local/:localId/rooms/:roomId', checkPermissionService.checkPermissionOwner, LocalController.addRoomToLocal);


export default router;