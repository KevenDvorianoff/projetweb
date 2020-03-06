const tokenService = require('../services/tokenService');
const func = require('../services/cookies');
const Users = require('../models/usersModel');

exports.checkPat = function(req, res) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then((result) => {
        if (result.Admin) {
            res.redirect('/admin/demande');
        } else if (result.IdPatrouille === null) {
            res.redirect('/newuser/demande');
        } else {
            Users.getNamePat(result.IdPatrouille).then((results) => {
                if(results[0].NomPatrouille === 'Maîtrise') {
                    res.redirect('/chef/patrouille');
                } else {
                    res.redirect('/scout/patrouille');
                }
            }).catch(() => {
                res.redirect('/');
            });
        }
    }).catch(() => {
        res.redirect('/');
    });

}