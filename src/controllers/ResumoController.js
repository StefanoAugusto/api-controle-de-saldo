const ResumoServices = require('../services/ResumoServices.js')

const selectResumo = async (request, response) => {
    const { ano, mes } = request.params
    const { status, message } = await ResumoServices.selectResumo(ano, mes)
    return response.status(status).json({ message })
}

module.exports = { selectResumo }
