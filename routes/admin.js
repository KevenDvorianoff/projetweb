const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.Accueil);

router.get('/delete/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.deleteRequest);

router.get('/accept/:NumCard', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.acceptRequest);

module.exports = router;