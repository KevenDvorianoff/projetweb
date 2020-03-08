const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.getPatrol);

router.post('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.createPatrol);

router.delete('/patrouille/delete/:NomPatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.deletePatrol);

router.get('/patrouille/modifier/:NomPatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.getScout);

router.put('/patrouille/modifier/:NomPatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.addScout);

router.delete('/patrouille/modifier/:NomPatrouille/delete/:NumCarte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.deleteScout);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, usersMiddleware.logOut);

router.get('/evenement', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.getEvents);

router.post('/evenement', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.createEvents);

router.delete('/evenement/delete/:IdEvent', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.deleteEvents);

router.get('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.getCompte);

router.put('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.updateCompte);

router.delete('/successeur', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, usersMiddleware.successeur, usersMiddleware.deleteCompte, usersMiddleware.logOut);


module.exports = router;