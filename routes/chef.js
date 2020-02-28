const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.Accueil);

module.exports = router;