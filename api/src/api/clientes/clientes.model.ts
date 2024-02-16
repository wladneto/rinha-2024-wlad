import * as z from 'zod';
import { WithId } from 'mongodb';
import { db } from '../../db'

export const Transacao = z.object({
    clienteid: z.number().optional(),
    valor: z.number().int().positive(),
    tipo: z.enum(['c', 'd']),
    descricao: z.string().max(10).min(1),
    realizada_em: z.string().optional()
})

const Cliente = z.object({
    clienteid: z.number().min(1),
    limite: z.number().int(),
    saldo: z.number().int()
});

const SaldoResponse = z.object({
    total: z.number().int(),
    data_extrato: z.string(),
    limite: z.number().int()
});

const ExtractResponse = z.object({
    saldo: SaldoResponse,
    ultimas_transacoes: z.array(Transacao)
});

const TransactionResponse = z.object({
    limite: z.number(),
    saldo: z.number()
})

export type Cliente = z.infer<typeof Cliente>;
export type Transacao = z.infer<typeof Transacao>;
export type ExtractResponse = z.infer<typeof ExtractResponse>
export type TransactionResponse = z.infer<typeof TransactionResponse>
export type ClienteWithId = WithId<Cliente>;
export type TransacaoWithId = WithId<Transacao>;
export const Clientes = db.collection<Cliente>('clientes');
export const Transacoes = db.collection<Transacao>('transacoes');
