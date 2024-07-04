import express from 'express';
import RoomController from "../controller/Room.ctr"
import checkPermissionService from "../services/CheckPermission.service"

const router = express.Router();

// Rutas para salas
router.post('/room', checkPermissionService.checkPermissionOwner, RoomController.createRoom);
router.get('/room', checkPermissionService.checkPermissionClient, RoomController.getAllRooms);
router.get('/room/ids', checkPermissionService.checkPermissionOwner, RoomController.getAllIdRooms);
router.get('/room/:roomId', checkPermissionService.checkPermissionClient, RoomController.getRoomById);
router.get('/room/appointment/:roomId', checkPermissionService.checkPermissionClient, RoomController.getAllAppointmentByIDRoom);
router.put('/room/:idRoom', checkPermissionService.checkPermissionOwner, RoomController.updateByIDRoom);
router.put('/room/:roomId/appointments', checkPermissionService.checkPermissionOwner, RoomController.updateRoomAppointments);
router.delete('/room/:roomId', checkPermissionService.checkPermissionOwner, RoomController.deleteRoom);


export default router;