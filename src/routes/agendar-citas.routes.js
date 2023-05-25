import { Router } from "express"
import addCitas from '../controllers/agendar-citas.controller.js'


const router = Router()

router.route('/clinicas')
    .get(addCitas.getClinicas)



export default router