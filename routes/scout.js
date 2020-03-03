const express = require('express');
const router = express.Router();
const scoutController = require('../controllers/scoutController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.Accueil);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, usersMiddleware.logOut);

module.exports = router;