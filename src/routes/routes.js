const express = require('express')
const router = express.Router()
const DespesaController = require('../controllers/DespesaController.js')
const ReceitaController = require('../controllers/ReceitaController.js')
const ResumoController = require('../controllers/ResumoController.js')
const UsuarioController = require('../controllers/UsuarioController.js')
const { eAdmin } = require('../middlewares/auth.js')

//USUÁRIO
router.post('/cadastro', UsuarioController.cadastraUsuario) //Cadastro de usuário
router.post('/login', UsuarioController.loginUsuario) //Login de usuário

//DESPESAS
router.post('/despesas', eAdmin, DespesaController.novaDespesa) //Cadastro de despesa
router.get('/despesas', eAdmin, DespesaController.selectDespesaTodas) //Busca despesas pela descrição ou todas "/despesas?descricao="
router.get('/despesas/:id', eAdmin, DespesaController.selectDespesaId) //Busca despesas pela Id no banco
router.get('/despesas/:ano/:mes', eAdmin, DespesaController.selectDespesaMes) //Busca despesas pelo Mês
router.put('/despesas/:id', eAdmin, DespesaController.updateDespesa) //Atualiza a despesa pela Id
router.delete('/despesas/:id', eAdmin, DespesaController.deleteDespesa) //Deleta a despesa pela Id

//RECEITAS
router.post('/receitas', eAdmin, ReceitaController.novaReceita) //Cadastro de receitas
router.get('/receitas', eAdmin, ReceitaController.selectReceitaTodas) //Busca receitas pela descrição "/receitas?descricao="
router.get('/receitas/:id', eAdmin, ReceitaController.selectReceitaId) //Busca receitas pela Id no banco
router.get('/receitas/:ano/:mes', eAdmin, ReceitaController.selectReceitaMes) //Busca receitas pelo Mês
router.put('/receitas/:id', eAdmin, ReceitaController.updateReceita) //Atualiza a receita pela Id
router.delete('/receitas/:id', eAdmin, ReceitaController.deleteReceita) //Deleta a receita pela Id

//RESUMOS
router.get('/resumo/:ano/:mes', eAdmin, ResumoController.selectResumo) //Busca um resumo mensal dos cadastros



module.exports = router