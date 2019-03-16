'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.get('/api/user', (req, res) => {
    User.find({}, (err, users) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!users) return res.status(404).send({message: `No existen usuarios`});
        
        res.status(200).send({users});
    })
});

app.get('/api/user/:userId', (req, res) => {
    let userId = req.params.userId;

    User.findById(userId, (err, user) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!user) return res.status(404).send({message: `El usuario no existe`});

        res.status(200).send({user});
    });
});

app.post('/api/user', (req, res) => {
    console.log('POST api/user');
    console.log(req.body);

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, userStored) =>{
        if (err) res.status(500).send({message:`Error al salvar en la base de datos: ${err} `});

        res.status(200).send({user: userStored});
    });
});

mongoose.connect('mongodb://localhost:27017/usersList', (err, res) => {
    if (err) {
        return console.log(`Error al conectar a base de datos: ${err}`);
    }
    console.log('conexion a la base de datos establecida...');

    app.listen(port, () => {
        console.log(`Servidor conectado en puerto: ${port}`);
    });
});

