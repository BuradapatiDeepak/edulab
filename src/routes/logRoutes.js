const express = require('express');
const router = express.Router();
const LogController = require('../controllers/logController');

router.get('/', LogController.getLogs);

module.exports = router;
