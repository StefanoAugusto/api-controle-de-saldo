const database = require('../database/connection.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UsuarioController {
    async cadastraUsuario(request, response) {
        const { usuario, senha } = request.body;
        const senhaCriptada = await bcrypt.hash(senha, 8);
        try {
            await database.insert({ usuario, senha: senhaCriptada }).table("usuarios")
            return response.status(200).json({ Mensagem: "Usuário cadastrado com sucesso!" })
        } catch (error) {
            return response.status(500).json({ Mensagem: "Algo deu errado (500)" })
        }
    }

    async loginUsuario(request, response) {
        const { usuario, senha } = request.body;
        let [usuarioBanco] = await database('usuarios').select().andWhereRaw(`usuario = ?`, [usuario]);
        console.log(usuarioBanco)
        if (usuarioBanco == undefined) {
            return response.status(400).json({ Mensagem: "Usuário ou senha inválido!" })
        }

        const checaSenha = await bcrypt.compare(senha, usuarioBanco.senha)

        if (checaSenha == false) {
            return response.status(400).json({ Mensagem: "Usuário ou senha inválido!" })
        }

        let token = jwt.sign({ id: usuarioBanco.id }, "5FXA4T5J8DT3HBV7FD25JK9", {
            //expiresIn: 300 //5 minutos
            expiresIn: '7d'
        })

        return response.status(200).json({ Mensagem: "Entrou com sucesso!", token })
    }
}

module.exports = new UsuarioController();