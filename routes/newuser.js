const express = require('express');
const router = express.Router();
const newuserController = require('../controllers/newuserController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, newuserController.demande);

router.post('/', usersMiddleware.checkConnexionUsers, usersMiddleware.checkNewUser, newuserController.traitementDemande);

module.exports = router;