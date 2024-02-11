
export default interface StatementResponse {
    saldo: {
        total: BigInteger,
        data_extrato: string,
        limite: BigInteger
    },
    ultimas_transacoes: [
        {
            valor: BigInteger,
            tipo: string, //only c or d
            descricao: string
            realizada_em: string
        }
    ]
}
