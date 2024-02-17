const { Cliente, Transacao } = require('../models/index')
const Op = require('sequelize');


const transacaoService = {

    create: ({clienteid, valor, tipo, descricao}) => new Promise( async(resolve, reject) => {
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

                // verificar limite de acordo com saldo
                const saldoAtualizdo = checarLimiteCliente(
                    cliente[0].limite,
                    cliente[0].saldo,
                    tipo,
                    valor
                )
                
                if (saldoAtualizdo === null ) {
                    throw new Error("Cliente não possui limite disponivel");
                }

                // atualizar o saldo
                await Cliente.update({ saldo: saldoAtualizdo },{
                    where: {
                      id: clienteid
                    }
                  }, { transaction: t });

                // criar a transacao
                await Transacao.create({
                    clienteid, valor, tipo, descricao
                  }, { transaction: t });
            
                return {
                    "limite" : cliente[0].limite,
                    "saldo" : saldoAtualizdo
                };

            });
            
            


            resolve(data);

        } catch (error) {
            reject(error)
        }
    })

    

}

function checarLimiteCliente(limite, saldo, transacasaoTipo, transacaoValue) {
    // Credit
    if (transacasaoTipo === 'c') {
        return saldo + transacaoValue;
    }

    // Debit
    if (saldo - transacaoValue < -limite) {
        return null;
    }

    return saldo - transacaoValue;
}

module.exports = transacaoService;