import express from 'express';
import multer from 'multer'; // Asegúrate de haber instalado multer

import FirebaseController from '../controller/FirebaseController'; // Ajusta la ruta según la ubicación de tu controlador

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }); // Configuración básica de multer, puedes personalizarla según tus necesidades

router.post('/upload', upload.single('file'), FirebaseController.uploadFile);
router.delete('/delete/:filePath', FirebaseController.deleteFile);
router.get('/files', FirebaseController.getFileURLsWithTypesInFolder);

export default router;
