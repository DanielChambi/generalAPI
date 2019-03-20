var User = require('../models/user');

exports.userGetList = function(req, res) {
    User.find({}, (err, users) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!users) return res.status(404).send({message: `No existen usuarios`});
        
        res.status(200).send({users});
    })
};

exports.userFindId = function(req, res) {
    let userId = req.params.userId;

    User.findById(userId, (err, user) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!user) return res.status(404).send({message: `El usuario no existe`});

        res.status(200).send({user});
    });
}

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