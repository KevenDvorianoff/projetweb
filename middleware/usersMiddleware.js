const tokenService = require('../services/tokenService');
const func = require('../services/cookies');
const Users = require('../models/usersModel');

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

exports.checkNewUser = function(req, res, next) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then((result) => {
        if (result.Admin) {
            res.redirect('/');
        } else if (result.IdPatrouille === null) {
            next();
        } else {
            res.redirect('/');
        }
    }).catch(() => {
        res.redirect('/');
    });

}

exports.checkScout = function(req, res, next) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then((result) => {
        if (result.Admin) {
            res.redirect('/');
        } else if (result.IdPatrouille === null) {
            res.redirect('/');
        } else {
            Users.getNamePat(result.IdPatrouille).then((results) => {
                if(results[0].NomPatrouille === 'Maîtrise') {
                    res.redirect('/');
                } else {
                    next();
                }
            }).catch(() => {
                res.redirect('/');
            });
        }
    }).catch(() => {
        res.redirect('/');
    });

}

exports.checkChef = function(req, res, next) {

    const token = func.getToken(req);
    tokenService.checkToken(token).then((result) => {
        if (result.Admin) {
            res.redirect('/');
        } else if (result.IdPatrouille === null) {
            res.redirect('/');
        } else {
            Users.getNamePat(result.IdPatrouille).then((results) => {
                if(results[0].NomPatrouille === 'Maîtrise') {
                    next();
                } else {
                    res.redirect('/');
                }
            }).catch(() => {
                res.redirect('/');
            });
        }
    }).catch(() => {
        res.redirect('/');
    });

}

