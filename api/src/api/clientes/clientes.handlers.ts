import { NextFunction, Request, Response } from 'express';
import { ClienteWithId, Clientes } from './clientes.model';

export async function findAll(req: Request, res: Response<ClienteWithId[]>, next: NextFunction) {
    try {
        const result = await Clientes.find();
        const clientes = await result.toArray();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
}