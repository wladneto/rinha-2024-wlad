const express = require('express')
const router = express.Router()

const clienteController = require('../controllers/cliente')


router.post('/', clienteController.create)
router.post('/:clienteid/transacoes', clienteController.createTransaction)
router.get('/:clienteid/extrato', clienteController.checkExtract)

module.exports = router;
