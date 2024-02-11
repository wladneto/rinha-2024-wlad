import request from 'supertest';

import app from '../../app';

describe('GET /api/v1/clientes', () => {
    it('responds with an array of clientes', async () =>
        request(app)
            .get('/api/v1/clientes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBeGreaterThan(0);
            }),
    );
});

