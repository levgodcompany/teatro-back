import { Router } from "express";
import { TheaterController } from "../controller/Theater.controller";

const theaterController = new TheaterController();
const router = Router();

// Ruta para obtener el teatro
router.get("/", theaterController.findTheater);

// Ruta para crear el teatro
router.post("/", theaterController.createTheater);

export default router;
