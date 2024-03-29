import { Router } from "express"
import listadoCitas from '../controllers/citas.controller.js'


const router = Router()

router.route('/citaspaciente/:pacientetoken')
    .get(listadoCitas.getCitas)

router.route('/citasmedico/:medicotoken')
    .get(listadoCitas.getCitasMedicos)

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

//router.route('/citapendiente/:pacientetoken')
//  .get(listadoCitas.getCitaPendiente)

router.route('/citacompledata/:citasid')
    .get(listadoCitas.getCitaCompleta)

router.route('/citasPorPacienteYMedico/:pacientetoken/:medicotoken')
    .get(listadoCitas.getCitasPorPacienteYMedico)

router.route('/citasPorPacienteYMedicoRealizadas/:pacientetoken/:medicotoken')
    .get(listadoCitas.getCitasPorPacienteYMedicoRealizadas)

export default router