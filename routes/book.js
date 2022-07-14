const { Router } = require('express');
const router = Router();

const BookController = require('../controllers/Book');

router.get('/', BookController.bookList);
router.post('/create', BookController.addBook);
router.post('/borrow', BookController.borrowBook);
router.post('/return', BookController.returnBook);


module.exports = router;
