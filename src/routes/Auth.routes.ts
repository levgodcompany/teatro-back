import express from 'express';
import AuthController from "../controller/Auth.ctr"

const router = express.Router();

// Rutas para Auth
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.put('/new-password', AuthController.newPassword);

router.post('/login/owner', AuthController.loginOwner);
router.post('/register/owner', AuthController.registerOwner);



export default router;