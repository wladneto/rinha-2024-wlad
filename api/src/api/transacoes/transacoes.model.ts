import * as z from 'zod';

export const Transacao = z.object({
    valor: z.number(),
    tipo: z.enum(['c', 'd']),
    descricao: z.string().max(10).min(1),
    realizada_em: z.string().optional()
})

export type Transacao = z.infer<typeof Transacao>;