'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = Schema({
    title: String,
    author: String,
    publisher: String,
    isbn: String
});

module.exports = mongoose.model('Book', BookSchema);