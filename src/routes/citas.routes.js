import { Router } from "express"
import listadoCitas from '../controllers/citas.controller.js'


const router = Router()

router.route('/citaspaciente/:pacientetoken')
    .get(listadoCitas.getCitas)

router.route('/citaspendientes/:pacientetoken')
    .get(listadoCitas.getCitasPendientes)

router.route('/citaspendientesmedico/:medicotoken')
    .get(listadoCitas.getCitasPendientesMedicos)

router.route('/citaspendientescitaid/:citaid')
    .get(listadoCitas.getCitasPendientesCitaID)

router.route('/citadiagnostico/:citaid')
    .get(listadoCitas.getCitaDiagnostico)

router.route('/anularcita/:citaid')
    .delete(listadoCitas.deleteCita)

router.route('/clinicasasociadas/:pacientetoken')
    .get(listadoCitas.getClinicaDeCitaPendiente)

router.route('/medicosasociados/:clinicatoken/:pacientetoken')
    .get(listadoCitas.getDoctoresConCitasPendientes);



export default router
