import express from 'express';
import OwnerController from "../controller/Owner.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para clientes


router.get('/owner/:ownerId', checkPermissionService.checkPermissionOwner, OwnerController.getOwnerById);


export default router;