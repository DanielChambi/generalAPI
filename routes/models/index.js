const models = require('express').Router();
const users = require('./users');
const books = require('./books');

models.use('/users', users);
models.use('/books', books)

module.exports = models;