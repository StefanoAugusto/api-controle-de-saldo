const express = require('express');
const cors = require('cors');
const { errorMiddleWare } = require('./src/middlewares/error.js');
const router = require('./src/routes/routes.js');
const { eAdmin, userId } = require('./src/middlewares/auth.js');
const app = express();
app.use(cors());
app.use(express.json());
app.use(errorMiddleWare);
app.use(router);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escutando na http://localhost:${port}`)
});

app.get('/', eAdmin, (request, response) => {
    return response.status(200).json({Mensagem: "Challenge Back End 4", usuario: request.userId})
});