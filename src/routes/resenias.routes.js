import { Router } from "express"
import reseniasConect from '../controllers/resenias.controller.js'
const router = Router()

router.route('/infoResenias')
    .get(reseniasConect.getResenias)

export default router
