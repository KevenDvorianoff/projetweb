const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersController.checkPat);

module.exports = router;