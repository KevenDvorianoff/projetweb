const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkAdmin, adminController.Accueil);

module.exports = router;