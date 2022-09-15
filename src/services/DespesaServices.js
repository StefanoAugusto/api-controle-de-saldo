const DespesaModels = require('../models/DespesaModels.js');

const novaDespesa = async (categoria, descricao, valor, dia) => {
    const categoriasPermitidas = ['alimentação',
        'Saúde', 'Moradia', 'Transporte', 'Educação',
        'Lazer', 'Imprevistos', 'Outras'];
    const apenasMes = dia.split('-')[1];
    let checaBase = await DespesaModels.checaBase(apenasMes, descricao)
    console.log(categoriasPermitidas.includes(categoria))
    if (checaBase.length) {
        return {
            status: 406,
            message: "Essa descrição já foi inserida neste mês."
        }
    } else if (categoriasPermitidas.includes(categoria)) {
        await DespesaModels.novaDespesa(categoria, descricao, valor, dia)
        return {
            status: 201,
            message: "Despesa criada com sucesso!"
        }
    } try {
        await DespesaModels.novaDespesaOutras(descricao, valor, dia)
        return {
            status: 201,
            message: "Despesa criada com a categoria OUTRAS"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

const selecionaDespesaMes = async (mes, ano) => {
    try {
        let despesaPorMes = await DespesaModels.selecionaDespesaMes(mes, ano)
        return {
            status: 200,
            message: despesaPorMes
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

const selecionaDespesaTodas = async (descricao) => {
    if (descricao) {
        try {
            let procuraDescricaoDespesa = await DespesaModels.selecionaDespesaDescricao(descricao)
            return {
                status: 200,
                message: procuraDescricaoDespesa
            }
        } catch (error) {
            return {
                status: 500,
                message: "Algo deu errado (500)"
            }
        }
    } else {
        let procuraTodasDespesas = await DespesaModels.selecionaDespesaTodas()
        return {
            status: 200,
            message: procuraTodasDespesas
        }
    }
}

const selecionaDespesaId = async (id) => {
    let despesaId = await DespesaModels.selecionaDespesaId(id)
    if (despesaId.length) {
        return {
            status: 200,
            message: despesaId
        }
    } else {
        return {
            status: 500,
            message: "Algo deu errado(500)"
        }
    }

}

const updateDespesa = async (id, descricao, valor, dia) => {
    try {
        await DespesaModels.updateDespesa(id, descricao, valor, dia)
        return {
            status: 200,
            message: "Despesa atualizada com sucesso!"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

const deleteDespesa = async (id) => {
    try {
        await DespesaModels.deleteDespesa(id)
        return {
            status: 200,
            message: "Despesa excluída com sucesso!"
        }
    } catch (error) {
        return {
            status: 500,
            message: "Algo deu errado (500)"
        }
    }
}

module.exports = {
    novaDespesa,
    selecionaDespesaMes,
    selecionaDespesaTodas,
    selecionaDespesaId,
    updateDespesa,
    deleteDespesa
};