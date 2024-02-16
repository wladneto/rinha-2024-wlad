import { NextFunction, Request, Response } from 'express';
import { ClienteWithId, Clientes, Transacoes } from './clientes.model';
import { Transacao, TransactionResponse, ExtractResponse } from '../clientes/clientes.model'
import MessageResponse from '../../interfaces/MessageResponse';
import { FindOptions } from 'mongodb';

type ClientTransactionResponse = TransactionResponse | MessageResponse;
type ClientExtractResponse = ExtractResponse | MessageResponse;

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
        let clientid = parseInt(req.params.id)
        const transaction: Transacao = req.body;
        const client = await Clientes.findOne({ clienteid: clientid });
        // If client doesn't exist, send an error response
        if (!client) {
            return res.status(404).json({ 'message': 'Cliente not found' }).send();
        }

        let resultTransaction = processTransaction(client.limite, client.saldo, transaction.tipo, transaction.valor);
        //When resultTransaction is string account limit was exceeds.
        if (resultTransaction === null) {
            return res.status(422).json({ 'message': 'Error: Transaction exceeds account limit.' }).send();
        }

        // Update the client's record in the database
        await Clientes.updateOne(
            { _id: client._id },
            { $set: { saldo: resultTransaction } }
        );

        const date = new Date();
        // Create new transaction
        await Transacoes.insertOne({
            clienteid: clientid,
            realizada_em: date.toISOString(),
            valor: transaction.valor,
            tipo: transaction.tipo,
            descricao: transaction.descricao
        });

        res.status(200);
        res.json({
            'limite': client.limite,
            'saldo': resultTransaction
        })

    } catch (error) {
        next(error);
    }
}

export async function showExtract_old(req: Request, res: Response<ClientExtractResponse>, next: NextFunction) {
    try {
        let clientid = req.params.id;

        const client = await Clientes.findOne({ clienteid: parseInt(clientid) });
        // If client doesn't exist, send an error response
        if (!client) {
            return res.status(404).json({ 'message': 'Cliente not found' }).send();
        }

        const transactions = await Transacoes.aggregate([
            { $match: { clienteid: parseInt(clientid) } }, // Filtra pelo clienteid
            { $sort: { realizada_em: -1 } }, // Ordena as transações pela data em ordem decrescente
            { $limit: 10 }, // Limita o resultado a 10 transações
            { $project: { _id: 0, clienteid: 0 } }
        ]).toArray();

        const lastTransactions: Transacao[] = transactions.map(doc => doc as Transacao);

        const date = new Date();


        res.status(200);
        res.json({
            saldo: {
                total: client.saldo,
                data_extrato: date.toISOString(),
                limite: client.limite
            },
            ultimas_transacoes: lastTransactions
        })

    } catch (error) {
        next(error);
    }
}

export async function showExtract(req: Request, res: Response<ClientExtractResponse>, next: NextFunction) {
    try {
        let clientid = parseInt(req.params.id)

        const client = await Clientes.findOne({ clienteid: clientid });
        // If client doesn't exist, send an error response
        if (!client) {
            return res.status(404).json({ 'message': 'Cliente not found' }).send();
        }

        // Define o filtro e as opções de busca
        const filter = { clienteid: clientid };
        const options: FindOptions<Document> = {
            sort: { _id: -1 },
            limit: 10
        };

        const cursor = Transacoes.find(filter, options);
        const lastTransactions = await cursor.toArray();

        const date = new Date();


        res.status(200);
        res.json({
            saldo: {
                total: client.saldo,
                data_extrato: date.toISOString(),
                limite: client.limite
            },
            ultimas_transacoes: lastTransactions
        })

    } catch (error) {
        next(error);
    }
}

function processTransactionOld(limit: number, balance: number, transactionType: string, transactionValue: number) {
    // Credit
    if (transactionType === 'c') {
        return balance + transactionValue;
    }

    // Debit
    let newBalance = balance - transactionValue;
    if (newBalance < -limit) {
        return null;
    }
    return newBalance;
}

function processTransaction(limit: number, balance: number, transactionType: string, transactionValue: number) {
    // Credit
    if (transactionType === 'c') {
        return balance + transactionValue;
    }

    // Debit
    if (balance - transactionValue < -limit) {
        return null;
    }

    return balance - transactionValue;
}

