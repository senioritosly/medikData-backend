
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
});




describe('Tests for auth routes', () => {
    let token;

    describe('POST /api/auth/signup', () => {
        it('should return a 200 status and create a new user', async () => {
            const newUser = {
                email: 'test@test.com',
                password: 'test123',
                // Añade aquí el resto de los campos necesarios para crear un usuario
            };
            const res = await request(app).post('/api/auth/signup').send(newUser);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Usuario creado correctamente');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should return a 200 status and log in the user', async () => {
            const user = {
                email: 'test@test.com',
                password: 'test123',
            };
            const res = await request(app).post('/api/auth/login').send(user);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Login successful');
            token = res.body.data.access_token; // Guarda el token para usarlo en las pruebas siguientes
        });
    });

    describe('GET /api/auth/user', () => {
        it('should return a 200 status and get the user info', async () => {
            const res = await request(app).get('/api/auth/user').set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.user).to.be.an('object');
        });
    });

    describe('POST /api/auth/logout', () => {
        it('should return a 200 status and log out the user', async () => {
            const res = await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Usuario deslogueado correctamente');
        });
    });
});
