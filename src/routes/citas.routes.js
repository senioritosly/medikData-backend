import { Router } from "express"
import addCitas from '../controllers/citas.controller.js'


const router = Router()

router.route('/citaspaciente/:dpi')
    .get(addCitas.getCitas)




export default router
