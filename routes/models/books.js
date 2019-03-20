const router = require('express').Router();
const Book = require('../../models/book');
const bookController = require('../../controllers/bookController');

router.get('/', bookController.bookGetList);
router.get('/:bookId', bookController.bookFindId);
router.post('/', bookController.bookCreate);

module.exports = router;