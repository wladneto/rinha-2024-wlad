import express from 'express';

import clientes from './clientes/clientes.routes'
import transacoes from './transacoes/transacoes.routes'

const router = express.Router();

router.use('/clientes', clientes);
router.use('/transacoes', transacoes); //TO:DO Remover

export default router;
