const express = require('express');
const router = express.Router();
const scoutController = require('../controllers/scoutController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getScout);

router.get('/evenement', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getEvent);

router.get('/materiel', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getMateriel);

router.put('/materiel/more/:IdMateriel', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.moreMateriel);

router.put('/materiel/less/:IdMateriel', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.lessMateriel);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, usersMiddleware.logOut);

router.get('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.getCompte);

router.put('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.updateCompte);

router.delete('/suppression', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, usersMiddleware.deleteCompte, usersMiddleware.logOut);

router.put('/quitter', usersMiddleware.checkConnexionUsers, usersMiddleware.checkScout, scoutController.quitPatrol, usersMiddleware.logOut);

module.exports = router;