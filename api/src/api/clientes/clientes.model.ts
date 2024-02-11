import * as z from 'zod';
import { WithId } from 'mongodb';
import { db } from '../../db'


const Transacao = z.object({
    valor: z.number(),
    tipo: z.enum(['c', 'd']),
    descricao: z.string().max(10).min(1)
})

const Cliente = z.object({
    clienteid: z.number().min(1),
    limite: z.number(),
    saldo: z.number(),
    transacoes: z.array(Transacao)
});



export type Transacao = z.infer<typeof Transacao>;
export type Cliente = z.infer<typeof Cliente>;
export type ClienteWithId = WithId<Cliente>;
export const Clientes = db.collection<Cliente>('clientes');