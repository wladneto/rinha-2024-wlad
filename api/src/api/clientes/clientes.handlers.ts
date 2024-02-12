import { NextFunction, Request, Response } from 'express';
import { ClienteWithId, Clientes } from './clientes.model';
import { Transacao, TransacaoWithId, Transacoes } from '../transacoes/transacoes.model';

export async function findAll(req: Request, res: Response<ClienteWithId[]>, next: NextFunction) {
    try {
        const result = await Clientes.find();
        const clientes = await result.toArray();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
}

export async function addTransaction(req: Request, res: Response<TransacaoWithId>, next: NextFunction) {
    try {
        const userId = req.params.id;
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