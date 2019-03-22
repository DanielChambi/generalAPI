var Book = require('../models/book');

exports.bookGetList = function(req, res){
    Book.find({}, (err, books) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!books) return res.status(404).send({message: `No existen entradas`});
        
        res.status(200).send({books});
    })
}

exports.bookFind = function(req, res){
    let element = req.params.element.toString();
    let string = req.params.string;
    
    var projection = new Object;
    projection[element] = string;

    console.log(projection);
    Book.find(projection, (err, books) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!books) return res.status(404).send({message: `No existen entradas`});
        
        res.status(200).send({books});
    });
};

exports.bookCreate = function(req, res){
    console.log('POST api/book');
    console.log(req.body);

    let book = new Book();
    book.title = req.body.title;
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book.isbn = req.body.isbn

    book.save((err, bookStored) =>{
        if (err) res.status(500).send({message:`Error al salvar en la base de datos: ${err} `});

        res.status(200).send({book: bookStored});
    });
}

exports.bookUpdate = function(req, res) {
    let bookId = req.params.bookId;
    let update = req.body;

    Book.findByIdAndUpdate(bookId, update, (err, bookUpdated) =>{
        if (err) return res.status(500).send({message: `Error al actualizar el libro: ${err}`});

        res.status(200).send({book: bookUpdated});
    });
}

exports.bookDelete = function(req, res) {
    let bookId = req.params.bookId;

    Book.findById(bookId, (err, book) => {
        if (err) res.status(500).send({message: `Error al borrar libro: ${err}`});

        book.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar libro: ${err}`});
            res.status(200).send({message: `El libro ha sido eliminado`})
        });
    });
}

