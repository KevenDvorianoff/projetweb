const tokenService = require('../services/tokenService');
const func = require('../services/cookies');
const Users = require('../models/usersModel');

exports.Accueil = function(req, res) {

    res.render('accueil');

};

exports.checkPat = function(req, res) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then((result) => {
        if (result.Admin) {
            res.redirect('/');
        } else if (result.IdPatrouille === null) {
            res.redirect('/users/newuser');
        } else {
            Users.getNamePat(result.IdPatrouille).then((results) => {
                if(results[0].NomPatrouille === 'Maitrise') {
                    res.redirect('/users/chef');
                } else {
                    res.redirect('/users/scout');
                }
            }).catch(() => {
                res.redirect('/');
            });
        }
    }).catch(() => {
        res.redirect('/');
    });

}