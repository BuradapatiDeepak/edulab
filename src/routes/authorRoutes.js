const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/authorController');

router.post('/', AuthorController.createAuthor);
router.get('/', AuthorController.getAuthors);

// Other routes for updateAuthor, deleteAuthor, etc.

module.exports = router;
