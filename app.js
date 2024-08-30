const express = require('express');
const app = express();


const cors = require('cors'); 
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);


const usuariosRouter = require('./src/routes/usuarios-routers');
app.use('/usuarios', usuariosRouter);

const medicamentosRouter = require('./src/routes/medicamentos-routers');
app.use('/medicamentos', medicamentosRouter);

const mascotasRouter = require('./src/routes/mascotas-routers');
app.use('/mascotas', mascotasRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log(`Servidor escuchando en el puerto ${port}`);
});