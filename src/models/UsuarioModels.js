const database = require('../database/connection.js');

const cadastraUsuario = async (usuario, senhaCriptada) => {
    await database.insert({ usuario, senha: senhaCriptada }).table("usuarios")
}

const checaUsuario = (usuario) => {
    return database('usuarios').select().andWhereRaw(`usuario = ?`, [usuario])
}

module.exports = { cadastraUsuario, checaUsuario }