import { Router } from "express"
import addCitas from '../controllers/agendarcitas.controller.js'


const router = Router()

router.route('/clinicas/')
    .get(addCitas.getClinicas)

router.route('/especialidades/:id_clinica')
    .get(addCitas.getEspecialidades)

router.route('/medico/:especialidad/:id_clinica')
    .get(addCitas.getMedico)




export default router
