const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const usersMiddleware = require('../middleware/usersMiddleware');

/* GET users listing. */
router.get('/', usersMiddleware.checkConnexionUsers, usersController.checkPat);

module.exports = router;