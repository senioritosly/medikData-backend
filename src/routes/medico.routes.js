import { Router } from "express";
import medicosController from "../controllers/medico.controller.js";

const router = Router();

router.route('/')
    .get(medicosController.getMedicos)
    .post(medicosController.crearMedico);

router.route('/horarios/:dpi')
    .get(medicosController.getHorarios);

router.route('/horarios/addhorario')
    .post(medicosController.addAvailability);

router.route('/diagnostico/:citaid')
    .post(medicosController.updateDiagnostico);

router.route('/:dpi')
    .get(medicosController.getMedicosClinicas);

export default router;