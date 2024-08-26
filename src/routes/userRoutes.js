const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);

// Other routes for updateUser, deleteUser, etc.

module.exports = router;
