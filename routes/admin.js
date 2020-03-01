const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.Accueil);

router.get('/delete/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.deleteRequest);

router.get('/accept/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.acceptRequest);

router.get('/troupe', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.Troupe);

router.get('/troupe/delete/:NomTroupe', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.deleteTroupe);

module.exports = router;