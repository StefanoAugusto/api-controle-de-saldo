const database = require('../database/connection.js')

class ReceController {
    async novaReceita(request, response) {
        const { descricao, valor, dia } = request.body
        let apenasMes = dia.split('-')[1]
        let checaBase = await database('receitas').select().andWhereRaw(`MONTH(dia) = ?`, [apenasMes]).andWhereRaw(`descricao = ?`, [descricao])
        if (checaBase.length) {
            return response.status(406).json({ Mensagem: "Essa descrição já foi inserida neste mês." })
        }
        try {
            await database.insert({ descricao, valor, dia }).table("receitas")
            return response.status(201).json({ Mensagem: "Receita criada com sucesso!" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }

    async selectAllReceitas(request, response) {
        let allReceitas = await database.select("*").table("receitas")
        return response.status(200).json({ allReceitas })
    }

    async selectOneReceita(request, response) {
        const { id } = request.params
        let oneReceitas = await database.select("*").table("receitas").where({ id })
        return response.status(200).json({ oneReceitas })
    }

    async updateReceita(request, response) {
        const { id } = request.params
        const { descricao } = request.body
        const { valor } = request.body
        const { dia } = request.body
        try {
            await database.where({ id: id }).update({ descricao: descricao, valor: valor, dia: dia }).table("receitas")
            return response.status(200).json({ Mensagem: "Receita atualizada com sucesso!" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }

    async deleteReceita(request, response) {
        const { id } = request.params
        try {
            await database.where({ id: id }).del().table("receitas")
            return response.status(200).json({ Mensagem: "Receita excluída com sucesso!" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }
}

module.exports = new ReceController()