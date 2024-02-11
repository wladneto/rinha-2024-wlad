import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import clientes from './clientes/clientes.routes'
import transacoes from './transacoes/transacoes.routes'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '👋🌎🌍🌏',
  });
});

router.use('/clientes', clientes);
router.use('/transacoes', transacoes); //TO:DO Remover

export default router;
