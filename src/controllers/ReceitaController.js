const ReceitaServices = require('../services/ReceitaServices')

class ReceitaController {
    async novaReceita(request, response) {
        const { descricao, valor, dia } = request.body
        const { status, message } = await ReceitaServices.novaReceita(descricao, valor, dia)
        return response.status(status).json({ message })
    }

    async selectReceitaMes(request, response) {
        const { mes } = request.params
        const { ano } = request.params
        const { status, message } = await ReceitaServices.selecionaReceitaMes(mes, ano)
        return response.status(status).json({ message })
    }

    async selectReceitaTodas(request, response) {
        const { descricao } = request.query
        const { status, message } = await ReceitaServices.selecionaReceitaTodas(descricao)
        return response.status(status).json({ message })
    }

    async selectReceitaId(request, response) {
        const { id } = request.params
        const { status, message } = await ReceitaServices.selecionaReceitaId(id)
        return response.status(status).json({ message })
    }

    async updateReceita(request, response) {
        const { id } = request.params
        const { descricao, valor, dia } = request.body
        const { status, message } = await ReceitaServices.updateReceita(id, descricao, valor, dia)
        return response.status(status).json({ message })
    }

    async deleteReceita(request, response) {
        const { id } = request.params
        const { status, message } = await ReceitaServices.deletaReceita(id)
        return response.status(status).json({ message })
    }
}

module.exports = new ReceitaController()