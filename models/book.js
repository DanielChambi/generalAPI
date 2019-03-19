'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = Schema({
    name: String,
    author: String,
    publisher: String,
    isbn: String
});

module.exports = mongoose.model('Book', BookSchema);