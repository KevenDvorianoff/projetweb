const tokenService = require('../services/tokenService');
const func = require('../services/cookies');

exports.checkConnexionIndex = function(req, res, next) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then(() => {
        res.redirect('/users');
    }).catch(() => {
        next();
    });

}

exports.checkConnexionUsers = function(req, res, next) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then(() => {
        next();
    }).catch(() => {
        res.redirect('/');
    });

}

exports.checkAdmin = function(req, res, next) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then((results) => {
        if (results.Admin) {
            next();
        } else {
            res.redirect('/');
        }
    }).catch(() => {
        res.redirect('/');
    });

}

