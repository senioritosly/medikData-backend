import { Router } from "express"
import auth from '../controllers/auth.controller.js'

const router = Router()

router.route('/users/:email')
    .get(auth.getUserByEmail)

router.route('/login')
    .post(auth.signIn)

router.route('/signup')
    .post(auth.signUp)

export default router