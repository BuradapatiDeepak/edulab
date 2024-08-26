const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

// Create a new book
router.post('/', BookController.createBook);

// Retrieve a list of books
router.get('/', BookController.getBooks);

// Update a book by ID
router.put('/:id', BookController.updateBook);

// Delete a book by ID
router.delete('/:id', BookController.deleteBook);

module.exports = router;
