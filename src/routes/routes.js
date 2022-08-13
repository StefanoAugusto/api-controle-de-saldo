const connection = require('../database/connection.js')
const express = require('express')
const router = express.Router()
const DespController = require('../controllers/DespController.js')
const ReceController = require('../controllers/ReceController.js')
const ResuController = require('../controllers/ResuController.js')

router.post('/despesas', DespController.novaDespesa)

router.get('/despesas', DespController.selectAllDespesas)

router.get('/despesas/:id', DespController.selectOneDespesa)

router.get('/despesas/:ano/:mes', DespController.selectDespesaPorMes)

router.put('/despesas/:id', DespController.updateDespesa)

router.delete('/despesas/:id', DespController.deleteDespesa)

router.post('/receitas', ReceController.novaReceita)

router.get('/receitas', ReceController.selectAllReceitas)

router.get('/receitas/:id', ReceController.selectOneReceita)

router.get('/receitas/:ano/:mes', ReceController.selectReceitaPorMes)

router.put('/receitas/:id', ReceController.updateReceita)

router.delete('/receitas/:id', ReceController.deleteReceita)

router.get('/resumo/:ano/:mes', ResuController.selectResumoReceita)

module.exports = router