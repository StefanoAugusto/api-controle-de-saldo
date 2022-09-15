const ReceitaModels = require('../models/ReceitaModels.js')

const novaReceita = async (descricao, valor, dia) => {
    try {
        await ReceitaModels.novaReceita(descricao, valor, dia)
        return {
            status: 201,
            message: "Receita criada com sucesso!"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado! (500)"
        }
    }
}

const selecionaReceitaMes = async (mes, ano) => {
    try {
        let receitaPorMes = await ReceitaModels.selecionaReceitaMes(mes, ano)
        return ({
            status: 200,
            message: receitaPorMes
        })
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

const selecionaReceitaTodas = async (descricao) => {
    if (descricao) {
        try {
            let receitasPorDescricao = await ReceitaModels.selecionaReceitaDescricao(descricao)
            return {
                status: 200,
                message: receitasPorDescricao
            }
        } catch (error) {
            return {
                status: 500,
                message: "Algo deu errado (500)"
            }
        }
    }
    let todasReceitas = await ReceitaModels.selecionaReceitaTodas()
    return {
        status: 200,
        message: todasReceitas
    }
}

const selecionaReceitaId = async (id) => {
    let receitaId = await ReceitaModels.selecionaReceitaId(id)
    if (receitaId.length) {
        return {
            status: 200,
            message: receitaId
        }
    } else {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

const updateReceita = async (id, descricao, valor, dia) => {
    try {
        await ReceitaModels.updateReceitaId(id, descricao, valor, dia)
        return {
            status: 200,
            message: "Receita atualizada com sucesso!"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

const deletaReceita = async (id) => {
    try {
        await ReceitaModels.deletaReceitaId(id)
        return {
            status: 200,
            message: "Receita excluída com sucesso!"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

module.exports = {
    novaReceita,
    selecionaReceitaMes,
    selecionaReceitaTodas,
    selecionaReceitaId,
    updateReceita,
    deletaReceita
}