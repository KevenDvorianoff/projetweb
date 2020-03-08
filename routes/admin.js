const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/demande', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.getRequest);

router.delete('/demande/delete/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.deleteRequest);

router.post('/demande/accept/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.acceptRequest);

router.get('/troupe', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.getTroop);

router.delete('/troupe/delete/:NomTroupe', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.deleteTroop);

router.get('/deconnexion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, usersMiddleware.logOut);

router.get('/gestion', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.Gestion);

router.delete('/clear', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.clearUser);

module.exports = router;