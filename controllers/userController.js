var User = require('../models/user');
const bcrypt = require('bcrypt');

exports.userGetList = function(req, res) {
    User.find({}, (err, users) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!users) return res.status(404).send({message: `No existen usuarios`});

        res.status(200).send({users});
    })
};

exports.userFind = function(req, res){
    let element = req.params.element.toString();
    let string = req.params.string;
    
    var projection = new Object;
    projection[element] = string;

    console.log(projection);
    User.find(projection, (err, users) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!users) return res.status(404).send({message: `No existen entradas`});
        
        res.status(200).send({users});
    });
};

exports.userAuthenticate = function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    
    User.findOne({'username': username}, (err, user) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if (!user) return res.status(404).send({message: `No existen entradas`});

        var userLogged = {
            id: user.id,
            username: user.username,
            email: user.email,
        }

        var samePass = bcrypt.compareSync(password, user.password);

        if(username != '' && password != '' && samePass && user.activated){
            res.status(200).send({userLogged});
        } else {
            res.status(401).send({message: 'Fallo de autenticación'})
        }
    });
}

exports.userCreate = function(req, res) {
    console.log('POST api/user');
    console.log(req.body);

    let user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, 0);
    user.activated = true;

    user.save((err, userStored) =>{
        if (err) res.status(500).send({message:`Error al salvar en la base de datos: ${err} `});

        res.status(200).send({user: userStored});
    });
}

exports.userUpdate = function(req, res) {
    let userId = req.params.userId;
    let update = req.body;

    console.log(update);

    if(update.password){
        update.password = bcrypt.hashSync(update.password, 0);
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
        if (err) return res.status(500).send({message: `Error al actualizar el usuario: ${err}`});

        res.status(200).send({user: userUpdated});
    });
}

exports.userDelete = function(req, res) {
    let userId = req.params.userId;

    User.findById(userId, (err, user) => {
        if (err) res.status(500).send({message: `Error al borrar usuario: ${err}`});

        user.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar usuario: ${err}`});
            res.status(200).send({message: `El usuario ha sido eliminado`})
        });
    });
}