const connection = require('../database/connection.js')
const express = require('express')
const router = express.Router()
const DespController = require('../controllers/DespController.js')
const ReceController = require('../controllers/ReceController.js')
const ResuController = require('../controllers/ResuController.js')
const UsuarioController = require('../controllers/UsuarioController.js')
const { eAdmin } = require('../middlewares/auth.js')

router.post('/despesas', eAdmin, DespController.novaDespesa)

router.get('/despesas', eAdmin, DespController.selectAllDespesas)

router.get('/despesas/:id', eAdmin, DespController.selectOneDespesa)

router.get('/despesas/:ano/:mes', eAdmin, DespController.selectDespesaPorMes)

router.put('/despesas/:id', eAdmin, DespController.updateDespesa)

router.delete('/despesas/:id', eAdmin, DespController.deleteDespesa)

router.post('/receitas', eAdmin, ReceController.novaReceita)

router.get('/receitas', eAdmin, ReceController.selectAllReceitas)

router.get('/receitas/:id', eAdmin, ReceController.selectOneReceita)

router.get('/receitas/:ano/:mes', eAdmin, ReceController.selectReceitaPorMes)

router.put('/receitas/:id', eAdmin, ReceController.updateReceita)

router.delete('/receitas/:id', eAdmin, ReceController.deleteReceita)

router.get('/resumo/:ano/:mes', eAdmin, ResuController.selectResumoReceita)

router.post('/cadastro', UsuarioController.cadastraUsuario)

router.post('/login', UsuarioController.loginUsuario)

module.exports = router