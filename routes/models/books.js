const router = require('express').Router();
const Book = require('../../models/book');

router.get('/', (req, res) =>{
    Book.find({}, (err, books) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!books) return res.status(404).send({message: `No existen entradas`});
        
        res.status(200).send({books});
    })
})

router.get('/:bookId', (req, res) => {
    let bookId = req.params.bookId;

    Book.findById(bookId, (err, book) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`});
        if(!book) return res.status(404).send({message: `El usuario no existe`});

        res.status(200).send({book});
    });
});

router.post('/', (req, res) => {
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
});

module.exports = router;