const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/demande', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.getRequest);

router.get('/demande/delete/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.deleteRequest);

router.get('/demande/accept/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.acceptRequest);

router.get('/troupe', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.getTroop);

router.get('/troupe/delete/:NomTroupe', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.deleteTroop);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, usersMiddleware.logOut);

router.get('/clear', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.clearUser);

module.exports = router;