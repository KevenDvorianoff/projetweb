const express = require('express');
const router = express.Router();
const newuserController = require('../controllers/newuserController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/demande', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, newuserController.demande);

router.post('/demande', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, newuserController.traitementDemande);

router.get('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, newuserController.getCompte);

router.post('/compte', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, newuserController.updateCompte);

router.get('/suppression', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, usersMiddleware.deleteCompte, usersMiddleware.logOut);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, usersMiddleware.logOut);

module.exports = router;