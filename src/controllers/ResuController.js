const database = require('../database/connection.js');

class ResuController {
    async selectResumoReceita(request, response) {
        const { mes } = request.params
        const { ano } = request.params
        try {
            let valoresRecebidos = await database('receitas').sum('valor').andWhereRaw(`Month(dia) = ?`, [mes]).andWhereRaw(`Year(dia) = ?`, [ano])
            let valoresGastos = await database('despesas').sum('valor').andWhereRaw(`Month(dia) = ?`, [mes]).andWhereRaw(`Year(dia) = ?`, [ano])
            let [valoresGastosCategoria] = await database.raw('SELECT d.categoria, sum(d.valor), (SELECT dia from despesas GROUP BY dia) as dia from despesas d GROUP BY categoria')
            let numeroDosRecebidos = valoresRecebidos[0]['sum(`valor`)']
            let numeroDosGastos = valoresGastos[0]['sum(`valor`)']
            let saldoFinal = numeroDosRecebidos - numeroDosGastos
            console.log (valoresGastosCategoria)
            return response.status(200).json({ valoresRecebidos, valoresGastos, saldoFinal, valoresGastosCategoria })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }
}

module.exports = new ResuController()