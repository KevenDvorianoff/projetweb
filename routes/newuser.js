const express = require('express');
const router = express.Router();
const newuserController = require('../controllers/newuserController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, newuserController.Accueil);

module.exports = router;