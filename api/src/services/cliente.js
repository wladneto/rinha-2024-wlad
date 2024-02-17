const { Cliente } = require('../models/index')


const clienteService = {

    create: ({saldo, limite}) => new Promise( async(resolve, reject) => {
        try {
            const data = await Cliente.create({
                saldo, limite
            });

            resolve(data);

        } catch (error) {
            reject(error)
        }
    })

    
}

module.exports = clienteService;