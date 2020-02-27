const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.Connexion);

router.post('/', indexController.traitementConnexion);

router.get('/inscription', indexController.Inscription);

router.post('/inscription', indexController.traitementInscription);

module.exports = router;