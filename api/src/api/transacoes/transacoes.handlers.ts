import { NextFunction, Request, Response } from 'express';
import { TransacaoWithId, Transacao, Transacoes } from './transacoes.model';
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


export async function createOne(req: Request<{}, TransacaoWithId, Transacao>, res: Response<TransacaoWithId>, next: NextFunction) {
    try {
        const insertResult = await Transacoes.insertOne(req.body);
        if (!insertResult.acknowledged) throw new Error('Erro ao inserir transacao.');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
        });
    } catch (error) {
        next(error);
    }
}

