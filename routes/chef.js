const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.getPatrol);

router.post('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.createPatrol);

router.get('/patrouille/delete/:NomPatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.deletePatrol);

router.get('/patrouille/modifier/:NomPatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.getScout);

router.post('/patrouille/modifier/:NomPatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.addScout);

router.get('/patrouille/modifier/:NomPatrouille/delete/:NumCarte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.deleteScout);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, usersMiddleware.logOut);

module.exports = router;