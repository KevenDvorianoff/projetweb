const express = require('express');
const router = express.Router();
const scoutController = require('../controllers/scoutController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getScout);

router.get('/evenement', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getEvent);

router.get('/materiel', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getMateriel);

router.get('/materiel/more/:IdMateriel', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.moreMateriel);

router.get('/materiel/less/:IdMateriel', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.lessMateriel);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, usersMiddleware.logOut);

router.get('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getCompte);

router.post('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.updateCompte);

router.get('/suppression', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, usersMiddleware.deleteCompte, usersMiddleware.logOut);

router.get('/quitter', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.quitPatrol, usersMiddleware.logOut);

module.exports = router;