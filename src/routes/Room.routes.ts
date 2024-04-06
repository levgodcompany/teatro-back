import { Router } from "express";
import { RoomController } from "../controller/Room.controller";


const roomController = new RoomController();
const router = Router();


router.get('/:idRoom', roomController.findAllRoomById);


router.get('/', roomController.findAllRoom);


router.post('/', roomController.createRoom);

router.put('/:idRoom', roomController.updateRoom);


router.delete('/:idRoom', roomController.deleteRoom);

export default router;