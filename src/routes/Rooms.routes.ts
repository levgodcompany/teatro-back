import express from 'express';
import RoomController from "../controller/Room.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para salas
router.post('/room', checkPermissionService.checkPermissionOwner, RoomController.createRoom);
router.get('/room', checkPermissionService.checkPermissionClient, RoomController.getAllRooms);
router.get('/room/:roomId', checkPermissionService.checkPermissionClient, RoomController.getRoomById);
router.get('/room/appointment/:roomId', checkPermissionService.checkPermissionClient, RoomController.getAllAppointmentByIDRoom);
router.put('/room/:roomId/appointments', checkPermissionService.checkPermissionOwner, RoomController.updateRoomAppointments);


export default router;