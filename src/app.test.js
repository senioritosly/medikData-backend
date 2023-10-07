
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

});
