import express from "express";

const app = express();
app.use(express.json())

//PRINCIPAL
app.get('/', (req, res) => {
    res.status(200).send('API Challenge Back End 3')
})

//ENTRADAS
const entradas =  [
    {id: 1, "descricao":"investimentos", "valor":"100.00","dia":"2022-08-03"},
    {id: 2, "descricao": "salario", "valor":"1300.00","dia":"2022-08-05"}
]

app.get('/receitas', (req, res) => {
    res.status(200).json(entradas)
})

app.get('/receitas/:id', (req, res) => {
    let index = buscaReceita(req.params.id);
    res.json(entradas[index]);
})

app.post('/receitas', (req, res) => {
    entradas.push(req.body);
    res.status(201).send('Entrada cadastrada com sucesso!')
})

app.put('/receitas/:id', (req, res) => {
    let index = buscaReceita(req.params.id);
    entradas[index].descricao = req.body.descricao;
    entradas[index].valor = req.body.valor;
    entradas[index].dia = req.body.dia;
    res.json(entradas)
})

app.delete('/receitas/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaReceita(id)
    entradas.splice(index, 1);
    res.send(`Entrada ${id} removida com sucesso!`)
})


function buscaReceita(id) {
    return entradas.findIndex(entrada => entrada.id == id)
}

//SAIDAS
const saidas =  [
    {id: 1, "descricao":"aluguel", "valor":"600.00","dia":"2022-08-05"},
    {id: 2, "descricao": "parcela do carro", "valor":"300.00","dia":"2022-08-05"}
]

app.get('/despesas', (req, res) => {
    res.status(200).json(saidas)
})

app.get('/despesas/:id', (req, res) => {
    let index = buscaDespesa(req.params.id);
    res.json(saidas[index]);
})

app.post('/despesas', (req, res) => {
    saidas.push(req.body);
    res.status(201).send('Saida cadastrada com sucesso!')
})

app.put('/despesas/:id', (req, res) => {
    let index = buscaDespesa(req.params.id);
    saidas[index].descricao = req.body.descricao;
    saidas[index].valor = req.body.valor;
    saidas[index].dia = req.body.dia;
    res.json(saidas)
})

app.delete('/despesas/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaDespesa(id)
    saidas.splice(index, 1);
    res.send(`Saida ${id} removida com sucesso!`)
})

function buscaDespesa(id) {
    return saidas.findIndex(saida=> saida.id == id)
}


export default app;