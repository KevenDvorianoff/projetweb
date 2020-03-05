const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionIndex, indexController.Connexion);

router.post('/', usersMiddleware.checkConnexionIndex, indexController.traitementConnexion);

router.get('/inscription', usersMiddleware.checkConnexionIndex, indexController.Inscription);

router.post('/inscription', usersMiddleware.checkConnexionIndex, indexController.traitementInscription);

module.exports = router;