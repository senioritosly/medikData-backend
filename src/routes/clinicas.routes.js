import { Router } from "express";
import listadoClinicas from "../controllers/clinicas.controller.js";

const router = Router();

router.route('/clinicas')
    .get(listadoClinicas.getClincas);

export default router;