const tokenService = require('../services/tokenService');
const func = require('../services/cookies');
const Users = require('../models/usersModel');
const Chef = require('../models/chefModel');

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

exports.logOut = function(req, res) {

    func.clearToken(res);
    res.redirect('/');

}

exports.successeur = function(req, res, next) {

    const numcard = req.body.NumCarte;
    if (req.body.NumCarte !== undefined) {
        if (!/^[A-Z0-9]{10}$/.test(req.body.NumCarte)) {
            func.setAlert(res, 'danger', 'Mauvais format de numéro de carte.')
            res.redirect('/chef/compte')
        }
        else {
            Chef.successeur(req, numcard).then(() => {
                next();
            }).catch((error) => {
                switch(error) {
                    case Chef.Errors.NO_RESULTS :
                        res.redirect(400,'/chef/compte')
                        break;
                    case Chef.Errors.BAD_REQUEST :
                        res.redirect(400,'/chef/compte')
                        break;
                    default : 
                        res.redirect(503,'/chef/compte')
                        break;
                }
            });
        }
    } else {
        func.setAlert(res, 'danger', 'Donnée manquante.')
        res.redirect('/chef/compte')
    }

};

exports.deleteCompte = function(req, res, next) {

    Chef.deleteCompte(req).then(() => {
        next();
    }).catch((error) => {
        switch(error) {
            case Chef.Errors.BAD_REQUEST :
                res.redirect(400,'/chef/compte')
                break;
            default : 
                res.redirect(503,'/chef/compte')
                break;
        }
    });

};
