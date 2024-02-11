import { Router } from 'express';
import * as TransacoesHandlers from './transacoes.handlers';

const router = Router();

router.get('/', TransacoesHandlers.findAll)

router.post('/', TransacoesHandlers.createOne)


export default router; 