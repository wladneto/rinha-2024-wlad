const { Cliente, Transacao } = require('../models/index')
const Op = require('sequelize');


const transacaoService = {

    create: ({ clienteid, valor, tipo, descricao }) => new Promise(async (resolve, reject) => {
        try {

            // verificar se cliente existe
            const cliente = await Cliente.findAll({
                where: {
                    id: clienteid
                }
            })

            if (cliente.length === 0) {
                const error = new Error("Cliente não existe");
                error.status = 404
                throw error;
            }

            let saldoAtualizdo
            if (tipo == 'd') {
                // verificar se tem limite caso debito
                saldoAtualizdo = checarLimiteCliente(
                    cliente[0].limite,
                    cliente[0].saldo,
                    tipo,
                    valor
                )

                if (saldoAtualizdo === null) {
                    const error = new Error("Cliente não possui limite disponivel");
                    error.status = 422
                    throw error;
                }
            } else {
                saldoAtualizdo = cliente[0].saldo + valor
            }

            // atualizar o saldo
            const tabelaClienteAtualizada = await Cliente.update({ saldo: saldoAtualizdo }, {
                where: {
                    id: clienteid
                }
            });

            if (tabelaClienteAtualizada.length === 0) {
                const error = new Error("Erro ao atualizar Tabela Cliente");
                error.status = 500
                throw error;
            }
            // criar a transacao
            const tabelaTransacaoAtualizada = await Transacao.create({
                clienteid, valor, tipo, descricao
            });

            if (tabelaTransacaoAtualizada.length === 0) {
                const error = new Error("Erro ao criar transação Tabela Transacoes");
                error.status = 500
                throw error;
            }

            resolve({
                "limite": cliente[0].limite,
                "saldo": saldoAtualizdo
            });

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