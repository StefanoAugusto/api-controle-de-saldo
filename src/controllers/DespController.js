const database = require('../database/connection.js')

class DespController {
    async novaDespesa(request, response) {
        const { descricao, valor, dia } = request.body
        let apenasMes = dia.split('-')[1]
        let checaBase = await database('despesas').select().andWhereRaw(`MONTH(dia) = ?`, [apenasMes]).andWhereRaw(`descricao = ?`, [descricao])
        if (checaBase.length) {
            return response.status(406).json({ Mensagem: "Essa descrição já foi inserida neste mês." })
        }
        try {
            await database.insert({ descricao, valor, dia }).table("despesas")
            return response.status(201).json({ Mensagem: "Despesa criada com sucesso!" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }

    async selectAllDespesas(request, response) {
        let allDespesas = await database.select("*").table("despesas")
        return response.status(200).json({ allDespesas })
    }

    async selectOneDespesa(request, response) {
        const { id } = request.params
        let oneDespesas = await database.select("*").table("despesas").where({ id })
        return response.status(200).json({ oneDespesas })
    }

    async updateDespesa(request, response) {
        const { id } = request.params
        const { descricao } = request.body
        const { valor } = request.body
        const { dia } = request.body
        try {
            await database.where({ id: id }).update({ descricao: descricao, valor: valor, dia: dia }).table("despesas")
            return response.status(200).json({ Mensagem: "Despesa atualizada com sucesso!" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }

    async deleteDespesa(request, response) {
        const { id } = request.params
        try {
            await database.where({ id: id }).del().table("despesas")
            return response.status(200).json({ Mensagem: "Despesa excluída com sucesso!" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }
}

module.exports = new DespController()