import express from 'express';
import clientes from './clientes/clientes.routes'

const router = express.Router();

router.use('/clientes', clientes);

export default router;
