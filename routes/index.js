const routes = require('express').Router();

const books = require('./books');
const users = require('./users');

routes.use('/users', users);
routes.use('/books', books);

module.exports = routes;