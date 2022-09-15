const database = require('../database/connection.js');

const checaBase = (apenasMes, descricao) => {
    return database('despesas').select().andWhereRaw(`MONTH(dia) = ?`, [apenasMes]).andWhereRaw(`descricao = ?`, [descricao])
}

const novaDespesa = (categoria, descricao, valor, dia) => {
    return database.insert({ categoria, descricao, valor, dia }).table("despesas")
}

const novaDespesaOutras = (descricao, valor, dia) => {
    return database.insert({ categoria: "Outras", descricao, valor, dia }).table("despesas")
}

const selecionaDespesaMes = (mes, ano) => {
    return database('despesas').select().andWhereRaw(`Month(dia) = ?`, [mes]).andWhereRaw(`Year(dia) = ?`, [ano])
}

const selecionaDespesaTodas = () => {
    return database.select("*").table("despesas")
}

const selecionaDespesaDescricao = (descricao) => {
    return database('despesas').select().where('descricao', 'rlike', descricao)
}

const selecionaDespesaId = (id) => {
    return database.select("*").table("despesas").where({ id })
}

const updateDespesa = (id, descricao, valor, dia) => {
    return database.where({ id: id }).update({ descricao: descricao, valor, dia: dia }).table("despesas")
}

const deleteDespesa = (id) => {
    return database.where({ id: id }).del().table("despesas")
}

module.exports = {
    checaBase,
    novaDespesa,
    novaDespesaOutras,
    selecionaDespesaMes,
    selecionaDespesaTodas,
    selecionaDespesaDescricao,
    selecionaDespesaId,
    updateDespesa,
    deleteDespesa
};