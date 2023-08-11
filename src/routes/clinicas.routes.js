import { Router } from "express";
import clinicasController from "../controllers/clinicas.controller.js"; // Importa el nuevo controlador de clínicas

const router = Router();

router.route('/')
    .get(clinicasController.getClincas) // Usa la función de obtención del controlador
    .post(clinicasController.crearClinica); // Agrega esta línea para la función de creación

export default router;
