import { Router } from 'express';
import * as ClientesHandlers from './clientes.handlers';

const router = Router();

router.get('/', ClientesHandlers.findAll)
//router.post('/:clienteId/transacoes', ClientesHandlers.addTransaction)


export default router;