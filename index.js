const express = require('express');
const cors = require('cors');
const { errorMiddleWare } = require('./src/middlewares/error.js')
const router = require('./src/routes/routes.js')

const app = express();
app.use(cors())
app.use(express.json())
app.use(errorMiddleWare)
app.use(router)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escutando na http://localhost:${port}`)
});
app.get('/', (req, res) => {
    res.send('API Challenge Back End 4')
})