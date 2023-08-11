import { Router } from "express";
import medicosController from "../controllers/medico.controller.js"; // Asegúrate de proporcionar la ruta correcta al controlador

const router = Router();

router.route('/')
    .get(medicosController.getMedicos)
    .post(medicosController.crearMedico);

export default router;
