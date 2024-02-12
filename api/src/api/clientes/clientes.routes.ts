import { Router } from 'express';
import * as ClientesHandlers from './clientes.handlers';
import { Transacao } from '../transacoes/transacoes.model';
import { validateRequest } from '../../middlewares';
import { ParamsWithNumberId } from '../../interfaces/ParamsWithNumberId';

const router = Router();

router.get('/', ClientesHandlers.findAll)
router.post(
    '/:id/transacoes',
    validateRequest({
        body: Transacao,
        params: ParamsWithNumberId
    }),
    ClientesHandlers.addTransaction
)


export default router;