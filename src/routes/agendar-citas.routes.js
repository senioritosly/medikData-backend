import { Router } from "express"
import addCitas from '../controllers/agendarcitas.controller.js'


const router = Router()

router.route('/clinicas')
    .get(addCitas.getClinicas)

router.route('/especialidades')
    .get(addCitas.getEspecialidades)


export default router