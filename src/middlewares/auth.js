const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const eAdmin = async function (request, response, next){
        const authHeader = request.headers.authorization;
        if(!authHeader){
            return response.status(400).json({Mensagem: "Usuário não está logado."})
        }
        const [, token] = authHeader.split(' ')
        if(!token){
            return response.status(400).json({Mensagem: "Usuário não está logado"})
        }
        try{
            const decode = await promisify(jwt.verify)(token, "5FXA4T5J8DT3HBV7FD25JK9");
            request.userId = decode.id
            return next()
        } catch (error){
            return response.status(400).json({Mensagem: "Token Inválido!"})
        }
}

module.exports = {eAdmin}

