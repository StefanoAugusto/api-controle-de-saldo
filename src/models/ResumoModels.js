const database = require('../database/connection.js')

const valoresRecebidos = (ano, mes) => {
    return database('receitas').sum('valor').andWhereRaw(`Month(dia) = ?`, [mes]).andWhereRaw(`Year(dia) = ?`, [ano])
}

const valoresGastos = (ano, mes) => {
    return database('despesas').sum('valor').andWhereRaw(`Month(dia) = ?`, [mes]).andWhereRaw(`Year(dia) = ?`, [ano])
}

const valoresGastosCategoria = (mes) => {
    return database.raw('SELECT categoria, sum(valor) as Soma from api_banco.despesas WHERE MONTH(dia) = ? GROUP BY categoria', [mes])
}
module.exports = { valoresRecebidos, valoresGastos, valoresGastosCategoria }