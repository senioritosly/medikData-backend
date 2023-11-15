import { Router } from "express";
import medicosController from "../controllers/medico.controller.js";

const router = Router();

router.route('/')
    .get(medicosController.getMedicos)
    .post(medicosController.crearMedico);

router.route('/updatehorarios')
    .put(medicosController.updateDisponibilidad);

router.route('/deletehorario')
    .put(medicosController.deleteDisponibilidad);

router.route('/horarios/:dpi')
    .get(medicosController.getHorarios);

router.route('/horarios/addhorario')
    .post(medicosController.addAvailability);

router.route('/diagnostico/:citaid')
    .put(medicosController.updateDiagnostico);

router.route('/:dpi')
    .get(medicosController.getMedicosClinicas);

router.route('/getpacientesmedico/:dpi')
    .get(medicosController.getPacientesMedico);

export default router;
