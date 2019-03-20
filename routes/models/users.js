const router = require('express').Router();
const User = require('../../models/user');
const userController = require('../../controllers/userController');

router.get('/', userController.userGetList);
router.get('/:userId', userController.userFindId);
router.post('/', userController.userCreate);

module.exports = router;