const ResumoModels = require('../models/ResumoModels.js')

const selectResumo = async (ano, mes) => {
    try {
        const [valoresGastosCategoria] = await ResumoModels.valoresGastosCategoria(mes)
        let valoresRecebidos = await ResumoModels.valoresRecebidos(ano, mes)
        let valoresGastos = await ResumoModels.valoresGastos(ano, mes)
        let numeroDosRecebidos = valoresRecebidos[0]['sum(`valor`)']
        let numeroDosGastos = valoresGastos[0]['sum(`valor`)']
        const saldoFinal = numeroDosRecebidos - numeroDosGastos
        return {
            status: 200,
            message: {
                Entradas: numeroDosRecebidos,
                Saídas: numeroDosGastos,
                "Saídas por categoria": valoresGastosCategoria,
                "Saldo Final": saldoFinal
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

module.exports = { selectResumo }