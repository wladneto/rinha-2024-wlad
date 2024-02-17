const { STATUS_CODES } = require('http');
const { Cliente, Transacao } = require('../models/index')

const extratoService = {

  get: ({ clienteid }) => new Promise(async (resolve, reject) => {
    try {

      // verificar se cliente existe
      const cliente = await Cliente.findAll({
        where: {
          id: clienteid
        }
      });

      if (cliente.length === 0) {
        const error = new Error("Cliente não existe");
        error.status = 404
        throw error;
      }

      // verificar extrato
      const transacoes = await Transacao.findAll({
        limit: 10,
        order: [['id', 'DESC']]
      }, {
        where: {
          clienteid
        }
      });

      const data_extrato = new Date();

      resolve({
        "saldo": {
          "total": cliente[0].saldo,
          "data_extrato": data_extrato.toISOString(),
          "limite": cliente[0].limite
        },
        "ultimas_transacoes": formatarTransacoes(transacoes)
      });



    } catch (error) {
      reject(error)
    }
  })


}

function formatarTransacoes(transacoes) {
  const novoArray = [];

  for (let i = 0; i < transacoes.length; i++) {
    const transacao = transacoes[i];
    const novaTransacao = {
      valor: transacao.valor,
      tipo: transacao.tipo,
      descricao: transacao.descricao,
      realizada_em: transacao.createdAt
    };
    novoArray.push(novaTransacao);
  }

  return novoArray;
}



module.exports = extratoService;