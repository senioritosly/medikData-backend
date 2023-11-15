import { Router } from "express"
import auth from '../controllers/auth.controller.js'

const router = Router()

router.route('/users/:email')
    .get(auth.getUserByEmail)

router.route('/login')
    .post(auth.signIn)

router.route('/signup')
    .post(auth.signUp)

router.route('/user')
    .get(auth.getUser)

router.route('/logout')
    .post(auth.logOut)

router.route('/update-password')
    .post(auth.updatePassword)
//router.route('/forgot-password')
//    .post(auth.forgotPassword)

//router.route('/reset-password')
//    .post(auth.resetPassword)

export default router
