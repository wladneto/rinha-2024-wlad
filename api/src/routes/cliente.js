const express = require('express')
const router = express.Router()

const clienteController = require('../controllers/cliente')

router.post('/', clienteController.create)

module.exports = router;
