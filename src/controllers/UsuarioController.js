const UsuarioService = require('../services/UsuarioServices.js')

class UsuarioController {
    async cadastraUsuario(request, response) {
        const { usuario, senha } = request.body;
        const { status, message } = await UsuarioService.cadastraUsuario(usuario, senha)
        return response.status(status).json({ message })
    }

    async loginUsuario(request, response) {
        const { usuario, senha } = request.body;
        const { status, message } = await UsuarioService.loginUsuario(usuario, senha)
        return response.status(status).json({ message })
    }
}

module.exports = new UsuarioController();