const UsuarioModels = require('../models/UsuarioModels.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cadastraUsuario = async (usuario, senha) => {
    const senhaCriptada = await bcrypt.hash(senha, 8);
    try {
        UsuarioModels.cadastraUsuario(usuario, senhaCriptada)
        return {
            status: 200,
            message: "Usuário cadastrado com sucesso!"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

const loginUsuario = async (usuario, senha) => {
    let [usuarioBanco] = await UsuarioModels.checaUsuario(usuario)
    if (usuarioBanco == undefined) {
        return {
            status: 400,
            message: "Usuário ou senha inválido!"
        }
    }
    const checaSenha = await bcrypt.compare(senha, usuarioBanco.senha)
    if (checaSenha == false) {
        return {
            status: 400,
            message: "Usuário ou senha inválido!"
        }
    }
    const token = jwt.sign({ id: usuarioBanco.id }, "5FXA4T5J8DT3HBV7FD25JK9", {
        //expiresIn: 300 //5 minutos
        expiresIn: '7d'
    })
    return {
        status: 200,
        message: `Entrou com sucesso! Token: ${token}`
    }
}

module.exports = { cadastraUsuario, loginUsuario }