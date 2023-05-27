import { Router } from "express"
import listadoCitas from '../controllers/citas.controller.js'


const router = Router()

router.route('/citaspaciente/:pacientetoken')
    .get(listadoCitas.getCitas)

router.route('/citaspendientes/:pacientetoken')
    .get(listadoCitas.getCitasPendientes)




export default router
