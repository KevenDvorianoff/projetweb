const Admin = require('../models/adminModel');
const func = require('../services/cookies');

exports.getRequest = function(req, res) {

    const alert = func.getAlert(req);
    Admin.getRequest().then((results) => {
        res.render('admin/demande', {results,alert})
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.NO_RESULTS :
                norequest = {text : 'Pas de demande.'}
                res.render('admin/demande', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('admin/demande', {alert})
                break;
        }
    });

};

exports.deleteRequest = function(req, res) {

    const numcard = req.params.NumCard;
    Admin.deleteRequest(numcard).then(() => {
        res.redirect('/admin/demande')
    }).catch(() => {
        res.redirect(503, '/admin/demande')
    });

};

exports.acceptRequest = function(req, res) {

    const numcard = req.params.NumCard;
    Admin.acceptRequest(numcard).then(() => {
        res.redirect('/admin/demande')
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.TROOP_ALREADY_EXIST :
                func.setAlert(res, 'danger', 'Cette troupe existe déjà.')
                res.redirect('/admin/demande')
                break;
            case Admin.Errors.BAD_REQUEST :
                res.redirect(400, '/admin/demande')
                break;
            default : 
                res.redirect(503, '/admin/demande')
                break;
        }
    });
    
};

exports.getTroop = function(req, res) {

    Admin.getTroop().then((results) => {
        res.render('admin/troupe', {results})
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.NO_RESULTS :
                norequest = {text : 'Pas de troupe.'}
                res.render('admin/troupe', {norequest})
                break;
            default : 
                alert = {type : 'danger', text : 'Service indisponible.'}
                res.status(503).render('admin/troupe', {alert})
                break;
        }
    });

};

exports.deleteTroop = function(req, res) {

    const nametroop = req.params.NomTroupe;
    Admin.delTroop(nametroop).then(() => {
        res.redirect('/admin/troupe')
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.BAD_REQUEST :
                res.redirect(400, '/admin/troupe')
                break;
            default : 
                res.redirect(503, '/admin/troupe')
                break;
        }
    });

};

exports.clearUser = function(req, res) {

    Admin.clearUser().then(() => {
        res.redirect('/admin/gestion')
    }).catch((error) => {
        switch(error) {
            case Admin.Errors.BAD_REQUEST :
                res.redirect(400, '/admin/gestion')
                break;
            default : 
                res.redirect(503, '/admin/gestion')
                break;
        }
    });

};

exports.Gestion = function(req, res) {

    res.render('admin/gestion')

};