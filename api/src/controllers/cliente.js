const clienteService = require('../services/cliente')

const clienteController = {
    create: async (req, res) => {
        try {
            const { limite, saldo } = req.body
            const data = await clienteService.create({limite: limite, saldo: saldo})
            return res.status(201).json({data})
            
        } catch (error) {
            return res.status(500).json({message: error?.message})
        }
    }
}

module.exports = clienteController;