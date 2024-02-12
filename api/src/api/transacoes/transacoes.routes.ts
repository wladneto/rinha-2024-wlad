import { Router } from 'express';
import * as TransacoesHandlers from './transacoes.handlers';
import { validateRequest } from '../../middlewares';
import { Transacao } from './transacoes.model';

const router = Router();

router.get('/', TransacoesHandlers.findAll)

router.post(
    '/',
    validateRequest({
        body: Transacao
    }),
    TransacoesHandlers.createOne
)


export default router; 