const models = require('express').Router();
const users = require('./users');

models.use('/users', users);

module.exports = models;