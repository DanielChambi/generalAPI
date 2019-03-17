const routes = require('express').Router();

const models = require('./models');

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Routes connected'});
});

routes.use('/models', models);

module.exports = routes;