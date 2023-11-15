
import request from 'supertest';
import app from './app.js';
import { expect } from 'chai';

describe('Tests for agendar-citas routes', () => {
    describe('GET /api/addcitas/clinicas/', () => {
        it('should return a 200 status and an object with an array of clinicas', async () => {
            const res = await request(app).get('/api/addcitas/clinicas/');

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.clinicas).to.be.an('array');
        });
    });
    
    describe('GET /api/addcitas/especialidades/:id_clinica', () => {
        it('should return a 200 status and an object with an array of especialidades', async () => {
            const id_clinica = 1; // Aquí debes poner un id_clinica válido para tu prueba.
            const res = await request(app).get(`/api/addcitas/especialidades/${id_clinica}`);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.especialidades).to.be.an('array');
        });
    });

    describe('GET /api/addcitas/medico/:especialidad/:id_clinica', () => {
        it('should return a 200 status and an object with an array of medicos', async () => {
            const id_clinica = 1; // Aquí debes poner un id_clinica válido para tu prueba.
            const especialidad = 'Cardiología'; // Aquí debes poner una especialidad válida para tu prueba.
            const res = await request(app).get(`/api/addcitas/medico/${especialidad}/${id_clinica}`);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.medico).to.be.an('array');
        });
    });

    describe('GET /api/clinicasasociadas/:pacientetoken', () => {
        it('should return a 200 status and an object with clinic information if patient has pending appointments', async () => {
            const pacientetoken = '3021185000101'; // Utiliza el pacientetoken específico proporcionado
    
            const res = await request(app).get(`/api/addcitas/clinicas-pendientes/${pacientetoken}`);
    
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            // Verifica la estructura o contenido de la respuesta según lo esperado
            // Esperas recibir información de la clínica relacionada con citas pendientes del paciente.
            expect(res.body.clinicas).to.be.an('array');
            // Asegúrate de que la respuesta contenga la información de la clínica esperada
            // (nombre, dirección, teléfono, etc.)
        });
    
        // Puedes agregar más casos de prueba para manejar diferentes escenarios (sin citas pendientes, pacientetoken no existente, etc.)
    });
    

});
