const DespesaServices = require('../services/DespesaServices.js')

class DespesaController {
    async novaDespesa(request, response) {
        const { categoria, descricao, valor, dia } = request.body
        const { status, message } = await DespesaServices.novaDespesa(categoria, descricao, valor, dia)
        return response.status(status).json({ message })
    }

    async selectDespesaMes(request, response) {
        const { mes } = request.params
        const { ano } = request.params
        const { status, message } = await DespesaServices.selecionaDespesaMes(mes, ano)
        return response.status(status).json({ message })
    }

    async selectDespesaTodas(request, response) {
        const { descricao } = request.query
        const { status, message } = await DespesaServices.selecionaDespesaTodas(descricao)
        return response.status(status).json({ message })
    }

    async selectDespesaId(request, response) {
        const { id } = request.params
        const { status, message } = await DespesaServices.selecionaDespesaId(id)
        return response.status(status).json({ message })
    }

    async updateDespesa(request, response) {
        const { id } = request.params
        const { descricao, valor, dia } = request.body
        const { status, message } = await DespesaServices.updateDespesa(id, descricao, valor, dia)
        return response.status(status).json({ message })
    }

    async deleteDespesa(request, response) {
        const { id } = request.params
        const { status, message } = await DespesaServices.deleteDespesa(id)
        return response.status(status).json({ message })
    }
}

module.exports = new DespesaController();