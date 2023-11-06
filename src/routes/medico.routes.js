import { Router } from "express";
import medicosController from "../controllers/medico.controller.js"; // Asegúrate de proporcionar la ruta correcta al controlador

const router = Router();

router.route('/')
    .get(medicosController.getMedicos)
    .post(medicosController.crearMedico);

router.route('/:dpi')
    .get(medicosController.getMedicosClinicas);

router.route('/horario/:dpi')
    .get(medicosController.getHorarios);

export default router;