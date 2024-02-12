import request from 'supertest';

import app from '../../app';

describe('GET /transacoes', () => {
    it('responds with an array of transacoes', async () =>
        request(app)
            .get('/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
            }),
    );
});

