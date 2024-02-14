import { NextFunction, Request, Response } from 'express';
import { ClienteWithId, Clientes } from './clientes.model';
import { Transacao } from '../clientes/clientes.model'
import MessageResponse from '../../interfaces/MessageResponse';
import TransactionResponse from '../../interfaces/TransactionResponse';

type ClientTransactionResponse = TransactionResponse | MessageResponse;
type ClientExtractResponse = TransactionResponse | MessageResponse;

export async function findAll(req: Request, res: Response<ClienteWithId[]>, next: NextFunction) {
    try {
        const result = await Clientes.find();
        const clientes = await result.toArray();
        res.json(clientes);
    } catch (error) {
        next(error);
    }
}

export async function addTransaction(req: Request, res: Response<ClientTransactionResponse>, next: NextFunction) {
    try {
        let clientid = req.params.id;
        const transaction: Transacao = req.body;
        const client = await Clientes.findOne({ clienteid: parseInt(clientid) });
        // If client doesn't exist, send an error response
        if (!client) {
            return res.status(404).json({ 'message': 'Cliente not found' }).send();
        }

        let resultTransaction = processTransaction(client.limite, client.saldo, transaction.tipo, transaction.valor);
        //When resultTransaction is string account limit was exceeds.
        if (typeof resultTransaction === 'string') {
            return res.status(422).json({ 'message': resultTransaction }).send();
        }

        const date = new Date();
        transaction.realizada_em = date.toISOString();
        client.transacoes.push(transaction);

        // Update the client's record in the database
        await Clientes.updateOne(
            { _id: client._id },
            { $set: { saldo: resultTransaction, transacoes: client.transacoes } }
        );

        res.status(200);
        res.json({
            'limite': client.limite,
            'saldo': resultTransaction
        })

    } catch (error) {
        next(error);
    }
}

export async function showExtract(req: Request, res: Response<ClientExtractResponse>, next: NextFunction) {
    try {
        let clientid = req.params.id;

        const client = await Clientes.findOne({ clienteid: parseInt(clientid) });
        // If client doesn't exist, send an error response
        if (!client) {
            return res.status(404).json({ 'message': 'Cliente not found' }).send();
        }

        res.status(200);
        res.json({
            message: 'desenvolva isso - ' + clientid
        })

    } catch (error) {
        next(error);
    }
}

function processTransaction(limit: number, balance: number, transactionType: string, transactionValue: number) {
    // Debit
    if (transactionType === 'd') {
        let newBalance: number;
        newBalance = balance - transactionValue;
        if (newBalance < -limit) {
            return 'Error: Transaction exceeds account limit.';
        }
        return newBalance;
    }
    // Credit
    return balance + transactionValue;
}