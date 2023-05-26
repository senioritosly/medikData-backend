import { Router } from "express"
import reseniasConect from '../controllers/resenias.controller.js'
const router = Router()

router.route('/resenias')
    .get(reseniasConect.getResenias)


export default router
