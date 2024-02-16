import request from 'supertest';

import app from '../../app';

let limitTest;
let balanceTest;

describe('GET /clientes', () => {
    it('responds with an array of clientes', async () =>
        request(app)
            .get('/clientes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBeGreaterThan(0);
            }),
    );
});

describe('POST /clientes/:id/transacoes', () => {
    it('responds with error - "id" on url is not number', async () =>
        request(app)
            .post('/clientes/123abc/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                "valor": 10,
                "tipo": "d",
                "descricao": "oi"
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );

    it('responds with error - "id" on url is number but does not exist on mongo', async () =>
        request(app)
            .post('/clientes/1234567/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                "valor": 10,
                "tipo": "d",
                "descricao": "oi"
            })
            .expect('Content-Type', /json/)
            .expect(404)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );

    //THIS TEST BELLOW CONSIDER DO YOU HAVE ONE CLIENTEID WITH VALUE 1
    //TO:DO - TRY RUN MONGO SCRIPT TO FILL 

    it('responds with error - body "valor" error ', async () =>
        request(app)
            .post('/clientes/1/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                "valor": "a",
                "tipo": "d",
                "descricao": "oi"
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );

    it('responds with error - body "tipo" error ', async () =>
        request(app)
            .post('/clientes/1/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                "valor": 10,
                "tipo": "debito",
                "descricao": "oi"
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );

    it('responds with error - body "descricao" error ', async () =>
        request(app)
            .post('/clientes/1/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                "valor": 10,
                "tipo": "d",
                "descricao": "Esta descrição possui mais que 10 caracteres"
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );

    it('responds sucessfull adding 10', async () =>
        request(app)
            .post('/clientes/1/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                "valor": 10,
                "tipo": "c",
                "descricao": "Venda-XPTO"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('limite');
                expect(response.body).toHaveProperty('saldo');
            }),
    );

    it('responds with erro - testing rule about limit', async () =>
        request(app)
            .post('/clientes/1/transacoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send({
                "valor": 9999999999999,
                "tipo": "d",
                "descricao": "Venda-XPTO"
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );

});

describe('GET /clientes/:id/extrato', () => {
    it('responds with success - DESCRIBBEEE', async () =>
        request(app)
            .get('/clientes/1/extrato')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('saldo');
                expect(response.body).toHaveProperty('ultimas_transacoes');
            }),
    );
});