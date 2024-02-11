import * as z from 'zod';
import { WithId } from 'mongodb';
import { db } from '../../db'


export const Transacao = z.object({
    valor: z.number(),
    tipo: z.string(),  //TO:DO VALIDAR
    //tipo: z.enum(['c', 'd']),
    descricao: z.string().max(10).min(1)
})

const TransacaoResponse = z.object({
    limite: z.number(),
    saldo: z.number()
})


export type Transacao = z.infer<typeof Transacao>;
export type TransacaoResponse = z.infer<typeof TransacaoResponse>;
export type TransacaoWithId = WithId<Transacao>;
export const Transacoes = db.collection<Transacao>('transacoes');