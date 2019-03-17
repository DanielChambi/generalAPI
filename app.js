'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use('/', routes);

mongoose.connect('mongodb://localhost:27017/usersList', (err, res) => {
    if (err) {
        return console.log(`Error al conectar a base de datos: ${err}`);
    }
    console.log('conexion a la base de datos establecida...');

    app.listen(port, () => {
        console.log(`Servidor conectado en puerto: ${port}`);
    });
});

