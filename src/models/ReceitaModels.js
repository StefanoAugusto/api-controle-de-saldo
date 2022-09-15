const database = require('../database/connection.js')

const novaReceita = async (descricao, valor, dia) => {
    return database.insert({ descricao, valor, dia }).table("receitas")
}

const selecionaReceitaMes = (mes, ano) => {
    return database('receitas').select().andWhereRaw(`Month(dia) = ?`, [mes]).andWhereRaw(`Year(dia) = ?`, [ano])
}

const selecionaReceitaDescricao = (descricao) => {
    return database('receitas').select().where('descricao', 'rlike', descricao)
}

const selecionaReceitaTodas = () => {
    return database.select("*").table("receitas")
}

const selecionaReceitaId = (id) => {
    return database.select("*").table("receitas").where({ id })
}

const updateReceitaId = (id, descricao, valor, dia) => {
    return database.where({ id: id }).update({ descricao: descricao, valor: valor, dia: dia }).table("receitas")
}

const deletaReceitaId = (id) => {
    return database.where({ id: id }).del().table("receitas")
}

module.exports = {
    novaReceita,
    selecionaReceitaMes,
    selecionaReceitaDescricao,
    selecionaReceitaTodas,
    selecionaReceitaId,
    updateReceitaId,
    deletaReceitaId
};