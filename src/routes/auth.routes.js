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

router.route( '/updateprofile/:dpi/:fullname' )
    .put( auth.updateUser )

router.route('/recover')
    .post(auth.forgotPassword)

router.route('/reset')
    .put(auth.updatePassword)


export default router
