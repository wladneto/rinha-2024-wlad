db = db.getSiblingDB('Rinha');

db.createCollection('clientes');

db.createCollection('transacoes');

db.clientes.insertMany([
    {
        clienteid: 1,
        limite: 100000,
        saldo: 0,
        transacoes:[]
    },
    {
        clienteid: 2,
        limite: 80000,
        saldo: 0,
        transacoes:[]
    },
    {
        clienteid: 3,
        limite: 1000000,
        saldo: 0,
        transacoes:[]
    },
    {
        clienteid: 4,
        limite: 10000000,
        saldo: 0,
        transacoes:[]
    },
    {
        clienteid: 5,
        limite: 500000,
        saldo: 0,
        transacoes:[]
    },
]);