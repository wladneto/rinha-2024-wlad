import { NextFunction, Request, Response } from 'express';
import { TransacaoWithId, Transacao, Transacoes, TransacaoResponse } from './transacoes.model';
import { InsertOneResult } from 'mongodb';

export async function findAll(req: Request, res: Response<TransacaoWithId[]>, next: NextFunction) {
    try {
        const result = await Transacoes.find();
        const clientes = await result.toArray();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
}

export async function createOne(req: Request<{}, TransacaoWithId, Transacao>, res: Response<InsertOneResult<TransacaoWithId>>, next: NextFunction) {
    try {
        const validateBodyResult = await Transacao.parse(req.body);
        const insertResult = await Transacoes.insertOne(validateBodyResult);
        res.json(insertResult);

    } catch (error) {
        next(error);
    }
}

