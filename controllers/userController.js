var User = require('../models/user');

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

exports.userCreate = function(req, res) {
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
}

exports.userUpdate = function(req, res) {
    let userId = req.params.userId;
    let update = req.body;

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