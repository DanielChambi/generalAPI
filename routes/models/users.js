const router = require('express').Router();
const User = require('../../models/user');
const userController = require('../../controllers/userController');

router.get('/', userController.userGetList);
router.get('/:userId', userController.userFindId);
router.post('/', userController.userCreate);
router.put('/:userId', userController.userUpdate);
router.delete('/:userId', userController.userDelete);

module.exports = router;