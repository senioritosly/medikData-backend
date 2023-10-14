

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

    describe('Tests for medico routes', () => {
        describe('GET /api/medico/:dpi', () => {
            it('should return a 200 status and an object with an array of medicos', async () => {
                const dpi = '23441800101'; // DPI para probar
                const res = await request(app).get(`/api/medico/${dpi}`);
    
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.medicos).to.be.an('array');
            });
        });
    });

});