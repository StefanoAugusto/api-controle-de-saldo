const database = require('../database/connection.js');

class DespController {
    async novaDespesa(request, response) {
        const { categoria, descricao, valor, dia } = request.body
        const categoriasPermitidas = ['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras']
        let apenasMes = dia.split('-')[1]
        let checaBase = await database('despesas').select().andWhereRaw(`MONTH(dia) = ?`, [apenasMes]).andWhereRaw(`descricao = ?`, [descricao])
        if (checaBase.length) {
            return response.status(406).json({ Mensagem: "Essa descrição já foi inserida neste mês." })
        } else if (categoriasPermitidas.includes(categoria)) {
            await database.insert({ categoria, descricao, valor, dia }).table("despesas")
            return response.status(201).json({ Mensagem: "Despesa criada com sucesso!" })
        }
        try {
            await database.insert({ categoria: "Outras", descricao, valor, dia }).table("despesas")
            return response.status(201).json({ Mensagem: "Despesa criada com a categoria OUTRAS" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }

    async selectDespesaPorMes(request, response) {
        const { mes } = request.params
        const { ano } = request.params
        try {
            let despesaPorMes = await database('despesas').select().andWhereRaw(`Month(dia) = ?`, [mes]).andWhereRaw(`Year(dia) = ?`, [ano])
            return response.status(200).json({ despesaPorMes })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }

    async selectAllDespesas(request, response) {
        const { descricao } = request.query
        if (descricao) {
            try {
                const procuraDescricaoDespesa = await database('despesas').select().where('descricao', 'rlike', descricao)
                return response.status(200).json({ procuraDescricaoDespesa })
            } catch (error) {
                return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
            }
        }
        let selectAllDespesas = await database.select("*").table("despesas")
        return response.status(200).json({ selectAllDespesas })
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
            await database.where({ id: id }).update({ descricao: descricao, valor, dia: dia }).table("despesas")
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

module.exports = new DespController();