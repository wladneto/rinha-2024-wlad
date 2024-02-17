const clienteService = require('../services/cliente')
const transacaoService = require('../services/transacao')
const extratoService = require('../services/extrato')

const clienteController = {

    create: async (req, res) => {
        try {
            const { limite, saldo } = req.body
            const data = await clienteService.create({limite: limite, saldo: saldo})
            return res.status(201).json({data})
            
        } catch (error) {
            return res.status(500).json({message: error?.message})
        }
    },

    createTransaction: async (req, res) => {
        try { 
            const { clienteid } = req.params
            const { valor, tipo, descricao } = req.body
            const data = await transacaoService.create({clienteid, valor, tipo, descricao})
            return res.status(201).json({data})
            
        } catch (error) {
            return res.status(500).json({message: error?.message})
        }
    },

    checkExtract: async (req, res) => {
        try { 
            const { clienteid } = req.params
            const data = await extratoService.get({clienteid})
            return res.status(200).json({data})
            
        } catch (error) {
            return res.status(500).json({message: error?.message})
        }
    }




}

module.exports = clienteController;