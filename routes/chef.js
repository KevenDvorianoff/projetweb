const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');
const usersMiddleware = require('../middleware/usersMiddleware');

router.get('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.getPatrol);

router.post('/patrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.createPatrol);

router.get('/patrouille/delete/:NomPatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.deletePatrol);

/*router.post('/patrouille/modifier/:Nompatrouille', usersMiddleware.checkConnexionUsers, usersMiddleware.checkChef, chefController.updatePatrol);
*/
module.exports = router;