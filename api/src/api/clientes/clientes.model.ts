import * as z from 'zod';
import { WithId } from 'mongodb';
import { db } from '../../db'
import { Transacao } from '../transacoes/transacoes.model';

const Cliente = z.object({
    clienteid: z.number().min(1),
    limite: z.number(),
    saldo: z.number(),
    transacoes: z.array(Transacao)
});

export type Cliente = z.infer<typeof Cliente>;
export type ClienteWithId = WithId<Cliente>;
export const Clientes = db.collection<Cliente>('clientes');