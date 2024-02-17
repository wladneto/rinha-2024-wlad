const { Cliente, Transacao } = require('../models/index')

const extratoService = {

    get: ({clienteid}) => new Promise( async(resolve, reject) => {
        try {
            
            const data = await Cliente.sequelize.transaction(async (t) => {

                // verificar se cliente existe
                const cliente = await Cliente.findAll({
                    where: {
                      id: clienteid
                    }
                  }, { transaction: t });

                if (cliente.length === 0 ) {
                    throw new Error("Cliente não existe");
                }

                // verificar extrato
                const transacoes = await Transacao.findAll({ 
                    limit: 10,
                    order: [['id', 'DESC']]
                },{
                    where: {
                      clienteid
                    }
                  }, { transaction: t });
                  
                const data_extrato = new Date();
            
                return {
                    "saldo": {
                      "total": cliente[0].saldo,
                      "data_extrato": data_extrato.toISOString(),
                      "limite": cliente[0].limite
                    },
                    "ultimas_transacoes": formatarTransacoes(transacoes)
                  };

            });
            

            resolve(data);

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